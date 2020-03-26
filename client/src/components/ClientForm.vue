<template>
  <b-modal id="client-form" centered size="md" @open="reset">
    <template v-slot:modal-header>
      <h4 class="text-primary">{{ title }}</h4>
    </template>
    <template v-slot:default>
      <b-form class="sm-px-5">
        <b-form-group
          :label="item.label"
          :description="item.valid === null ? item.description : ''"
          v-for="item in form"
          :key="item.label"
        >
          <b-row>
            <b-col>
              <b-form-input
                size="sm"
                v-model="item.model"
                spellcheck="false"
                autocomplete="off"
                :state="item.valid"
                @input="item.valid = null"
                @blur="validate(item)"
              />
            </b-col>
            <b-col v-if="item.label=='Providers'" cols="5" sm="4">
              <b-btn size="sm" @click="addProvider" v-if="!updatedProvider">Add Provider</b-btn>
              <b-button-group v-else size="sm">
                <b-btn>
                  <b-icon-person-check-fill />
                </b-btn>
                <b-btn>
                  <b-icon-x-circle-fill @click="finishProviderUpdating"/>
                </b-btn>
              </b-button-group>
            </b-col>
          </b-row>
          <b-form-invalid-feedback :state="item.valid" class="px-1">{{ item.validationError }}</b-form-invalid-feedback>
          <b-form-valid-feedback :state="item.valid" class="px-1">Ok</b-form-valid-feedback>
        </b-form-group>
        <b-container class="px-0">
          <b-checkbox-group v-model="providersChecked" @change="nocheckedError = false">
            <b-row v-for="provider in providers" :key="provider._id" align-h="start" class="mb-1">
              <b-col>
                <b-checkbox :value="provider._id">{{ provider.name }}</b-checkbox>
              </b-col>
              <b-col>
                <b-button-group size="sm">
                  <b-btn @click="updateProvider(provider)">
                    <b-icon-pencil />
                  </b-btn>
                  <b-btn @click="deleteProvider(provider)">
                    <b-icon-trash />
                  </b-btn>
                </b-button-group>
              </b-col>
            </b-row>
          </b-checkbox-group>
          <p class="pt-3 text-danger"
            v-if="nocheckedError"
          >At least one provider should be selected!</p>
        </b-container>
      </b-form>
    </template>
    <template v-slot:modal-footer>
      <b-row>
        <b-btn size="sm">Cancel</b-btn>
        <b-btn class="ml-2" size="sm" @click="submit">Add Client</b-btn>
      </b-row>
    </template>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { Client, Provider } from "@/api";
export default {
  name: "Form",
  data: () => ({
    form: {
       name: {
          label: "Name",
          model: "",
          description: "From 3 to 20 characters, spaces or digits.",
          pattern: /^[a-z\d\s]{3,20}$/i,
          valid: null,
          validationError: null
        },
        email: {
          label: "Email",
          model: "",
          description: "Valid email address.",
          pattern: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i,
          valid: null,
          validationError: null
        },
        phone: {
          label: "Phone",
          model: "",
          description: "At least 6 digits.",
          pattern: /^[\d-+]{6,15}$/,
          valid: null,
          validationError: null
        },
        providers: {
          label: "Providers",
          model: "",
          pattern: /^[a-z\d\s]{3,20}$/i,
          description: "From 3 to 20 characters, spaces or digits.",
          valid: null,
          validationError: null
        }
    },
    providersChecked: [],
    nocheckedError: false,
    updatedProvider: null
  }),
  computed: {
    title() {
      return this.editedClient ? "Update Client" : "Create Client";
    },
    ...mapGetters(["editedClient", "client", "providers"])
  },
  methods: {
    reset() {
      for (let i in this.form) {
        this.form[i].model = '';
        this.form[i].valid = null;
        this.form[i].validationError = null;
      }
      this.providersChecked = [];
      this.nocheckedError = false;
      this.updatedProvider = null;
    },
    async validate(item) {
      if (item.label === "Providers" && !item.model.length) return true;

      if (!item.pattern.test(item.model)) {
        item.valid = false;
        item.validationError = `${item.label} is invalid!`;
        return false;
      }

      let api, query;

      if (item.label === "Providers") {
        api = Provider;
        query = `name=${item.model}`;
      } else {
        api = Client;
        query = `${item.label.toLowerCase()}=${item.model}`;
      }

      try {
        if (await api.get(query)) {
          item.valid = false;
          item.validationError = `${item.label} ${item.model} is already in use!`;
          return false;
        }
      } catch (e) {
        console.log(e.response);
        return false;
      }
      return true;
    },
    submit() {
      if (!this.providersChecked.length) return (this.nocheckedError = true);

      for (let i in this.form) {
        if (!this.form[i].valid && !this.validate(this.form[i])) return;
      }

      let client = {
        name: this.form.name.model,
        email: this.form.email.model,
        phone: this.form.phone.model,
        providers: this.providersChecked
      };

      this.createClient(client)
        .then(() => this.reset())
        .catch(e => console.log(e));
    },
    addProvider() {
      this.createProvider(this.form.providers.model)
        .then(() => (this.form.providers.model = ""))
        .catch(
          () => (this.form.providers.validationError = "Invalid provider name!")
        );
    },
    updateProvider(provider) {
      this.updatedProvider = provider._id;
      this.form.providers.model = provider.name;
    },
    finishProviderUpdating() {
      this.updatedProvider = null;
      this.form.providers.model = '';
    },
    ...mapActions(["createProvider", "createClient", "deleteProvider"])
  }
};
</script>