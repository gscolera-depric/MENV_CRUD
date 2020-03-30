<template>
  <b-modal id="form" centered size="md" @show="resetForm" @hide="forgetClient">
    <template v-slot:modal-header>
      <h4 class="text-primary">{{ client ? 'Update Client' : 'New Client' }}</h4>
    </template>
    <template v-slot:default>
      <b-form class="sm-px-5">
        <b-form-group
          :label="item.label"
          v-for="item in form"
          :description="item.error === '' ? item.desc : ''"
          :key="item.label"
        >
          <b-row>
            <b-col>
              <b-form-input
                size="sm"
                v-model.trim="item.model"
                spellcheck="false"
                autocomplete="off"
                :state="item.valid"
                @input="validate(item)"
              />
            </b-col>
            <b-col v-if="item.label=='Provider'" cols="6" sm="4">
              <b-btn
                size="sm"
                :disabled="!form.provider.valid"
                @click="addProvider"
                v-if="!updatedProvider"
              >Add Provider</b-btn>

              <b-button-group v-else size="sm">
                <b-btn :disabled="!form.provider.valid" @click="updateProvider">
                  <b-icon-person-check-fill />
                </b-btn>
                <b-btn  @click="cancelProviderUpdating">
                  <b-icon-x-circle-fill />
                </b-btn>
              </b-button-group>
            </b-col>
          </b-row>
          <b-form-invalid-feedback :state="item.valid" class="px-1">{{ item.error }}</b-form-invalid-feedback>
        </b-form-group>
        <b-container class="px-0 pt-3">
          <b-checkbox-group v-model="checked">
            <b-row v-for="provider in providers" :key="provider._id" align-h="start" class="mb-1">
              <b-col>
                <b-checkbox :value="provider._id">{{ provider.name }}</b-checkbox>
              </b-col>
              <b-col>
                <b-button-group size="sm">
                  <b-btn @click="startProviderUpdating(provider)">
                    <b-icon-pencil />
                  </b-btn>
                  <b-btn @click="deleteProvider(provider)">
                    <b-icon-trash />
                  </b-btn>
                </b-button-group>
              </b-col>
            </b-row>
          </b-checkbox-group>
          <p
            class="pt-3 text-danger"
            v-if="!checked.length"
          >At least one provider should be selected!</p>
        </b-container>
      </b-form>
    </template>
    <template v-slot:modal-footer>
      <b-row>
        <b-btn size="sm" @click="$bvModal.hide('form')">Cancel</b-btn>
        <b-btn
          v-if="!client"
          class="ml-2"
          size="sm"
          @click="submit"
          :disabled="!readyToSubmit"
        >Add Client</b-btn>
        <b-btn v-else class="ml-2" size="sm" @click="submitUpdate" :disabled="!readyToUpdate">Update</b-btn>
      </b-row>
    </template>
  </b-modal>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { Client, Provider } from "@/api";
export default {
  name: "Form",
  data: () => ({
    form: {
      name: {
        label: "Name",
        model: "",
        valid: null,
        desc: "From 3 to 20 latin characters, spaces or digits.",
        error: "",
        pattern: /^[a-z\s\d]{3,20}$/i
      },
      email: {
        label: "Email",
        model: "",
        valid: null,
        desc: "Valid email address!",
        error: "",
        pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i
      },
      phone: {
        label: "Phone",
        model: "",
        valid: null,
        desc: "Minimum 6 digits",
        error: "",
        pattern: /^[\d-+]{6,20}$/
      },
      provider: {
        label: "Provider",
        model: "",
        valid: null,
        desc: "From 3 to 20 latin characters, spaces or digits.",
        error: "",
        pattern: /^[a-z\s\d]{3,20}$/i,
        origin: ""
      }
    },
    checked: [],
    updatedProvider: null
  }),
  computed: {
    ...mapGetters(["client", "providers"]),
    readyToSubmit() {
      return (
        this.form.name.valid &&
        this.form.email.valid &&
        this.form.phone.valid &&
        this.checked.length
      );
    },
    readyToUpdate() {
      let keys = [];

      if (this.form.name.model != this.client.name) keys.push("name");
      if (this.form.email.model != this.client.email) keys.push("email");
      if (this.form.phone.model != this.client.phone) keys.push("phone");

      keys.forEach(key => {
        if (!this.form[key].valid)
          return false;
      });

      if (keys.length && this.checked.length ) return true;
      if (this.checked.length && this.checked.length != this.client.providers.length) return true;

      for (let i = 0; i < this.checked.length; i++){
        for (let j = 0; j < this.client.providers.length; j++) {
          if (this.checked != this.client.providers[j]._id)
            return true;
        }
      }
      return false;
    }
  },
  methods: {
    validate(item) {
      if (item.model == item.origin) return item.valid = null;
      if (!item.pattern.test(item.model)) return this.setError(item, "");

      let params = {};
      let api = item.label === "Provider" ? Provider : Client;
      let key = item.label === "Provider" ? "name" : item.label.toLowerCase();

      params[key] = item.model;

      api
        .get(params)
        .then(res => {
          if (res)
            return this.setError(
              item,
              `${item.label} ${item.model} is already in use`
            );

          item.valid = true;
          item.error = "";
        })
        .catch(() => this.setError(item, "Internal server error"));
    },
    setError(item, error) {
      item.valid = false;
      item.error = error;
    },
    resetForm() {
      for (let i in this.form) this.resetField(this.form[i]);

      this.checked = [];

      if (this.client) {
        this.form.name.model = this.client.name;
        this.form.name.origin = this.client.name;
        this.form.email.model = this.client.email;
        this.form.email.origin = this.client.email;
        this.form.phone.model = this.client.phone;
        this.form.phone.origin = this.client.phone;
        this.client.providers.forEach(provider =>
          this.checked.push(provider._id)
        );
      }
    },
    resetField(field) {
      field.model = "";
      field.error = "";
      field.origin = "";
      field.valid = null;
    },
    submit() {
      let client = {
        name: this.form.name.model,
        email: this.form.email.model,
        phone: this.form.phone.model,
        providers: this.checked
      };

      Client.create(client)
        .then(res => {
          this.addClientToStore(res);
          this.resetForm();
          this.$bvModal.hide('form');
          this.$bvModal.msgBoxOk("Client was successfully created!");
        })
        .catch(() => this.$emit("error"));
    },
    submitUpdate() {
      let options = {
        params: { id: this.client._id },
        client: {
          name: this.form.name.model,
          email: this.form.email.model,
          phone: this.form.phone.model,
          providers: this.checked 
        }
      }

      Client.update(options)
        .then(res => {
          this.updateClientAtStore(res);
          this.$bvModal.hide('form');
          this.$root.$emit('bv::refresh::table', 'client-list');
        })
        .catch(e => this.$emit('error'))
    },
    addProvider() {
      Provider.create(this.form.provider.model).then(res => {
        this.addProviderToStore(res);
        this.$bvModal.msgBoxOk("Provider was successfully created!");
        this.resetField(this.form.provider);
      });
    },
    startProviderUpdating(provider) {
      this.updatedProvider = provider._id;
      this.form.provider.model = provider.name;
      this.form.provider.valid = null;
      this.form.provider.error = "";
    },
    updateProvider() {
      let options = {
        id: this.updatedProvider,
        name: this.form.provider.model
      };

      Provider.update(options)
        .then(() => {
          this.updateProviderAtStore(options);
          this.resetField(this.form.provider);
          this.updatedProvider = null;
        })
        .catch(e => console.log(e));
    },
    cancelProviderUpdating() {
      this.resetField(this.form.provider);
      this.updatedProvider = null;
    },
    deleteProvider(provider) {
      let message = `Are you sure you want to delete '${provider.name}' provider?`;
      let options = {
        title: "Please confirm!",
        buttonSize: "sm",
        okVariant: "danger",
        okTitle: "Delete"
      };

      this.$bvModal
        .msgBoxConfirm(message, options)
        .then(value => {
          if (!value) return;

          Provider.delete({ id: provider._id })
            .then(() => this.removeProviderFromStore(provider._id))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    },
    ...mapMutations([
      "removeProviderFromStore",
      "resetClient",
      "addClientToStore",
      "addProviderToStore",
      "updateProviderAtStore",
      "updateClientAtStore",
      "forgetClient"
    ])
  }
};
</script>