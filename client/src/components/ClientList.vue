<template>
  <b-container class="pt-md-5 px-0">
    <b-row
      class="bg-secondary w-100 px-md-2 py-2 px-3 text-white mx-auto"
      align-h="between"
      align-v="center"
    >
      <strong>Clients</strong>
      <b-btn size="sm" @click="$bvModal.show('form')">
        <b-icon-person-plus-fill />
      </b-btn>
    </b-row>
    <b-table :fields="fields" :items="clients" primary-key="name" stacked="md" outlined id="client-list">
      <template v-slot:cell(name)="data">{{ data.item.name }}</template>
      <template v-slot:cell(email)="data">{{ data.item.email }}</template>
      <template v-slot:cell(phone)="data">{{ data.item.phone }}</template>
      <template v-slot:cell(providers)="data">
        <span v-for="provider in data.item.providers" :key="provider.id">{{ `${provider.name}, ` }}</span>
      </template>
      <template v-slot:cell(actions)="data">
        <b-button-group size="sm">
          <b-btn @click="startClientUpdating(data.item)" variant="light">
            <b-icon-pencil class="bg-secodary" />
          </b-btn>
          <b-btn @click="deleteClient(data.item)" variant="light">
            <b-icon-trash class="bg-secodary" />
          </b-btn>
        </b-button-group>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { Client } from '@/api';
export default {
  name: "ClientList",
  data: () => ({
    isBusy: false,
    fields: [
      {
        key: "Name",
        sortable: true
      },
      {
        key: "Email",
        sortable: true
      },
      {
        key: "Phone",
        sortable: true
      },
      {
        key: "Providers",
        sortable: true
      },
      {
        key: "Actions"
      }
    ],
    hovered: false
  }),
  computed: {
    ...mapGetters(['clients'])
  },
  methods: {
    deleteClient(client) {
      let message = `Are you sure you want to delete ${client.name}?`;
      let options = {
        title: 'Please confirm!',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Delete'
      };

      this.$bvModal.msgBoxConfirm(message, options)
        .then(value => {
          if (!value) return;

          Client.delete({ id: client._id })
            .then(() => this.removeCLientFromStore(client._id))
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e));
    },
    startClientUpdating(client) {
      this.rememberClient(client);
      this.$bvModal.show('form');
    },
    
    ...mapMutations(['removeCLientFromStore', 'rememberClient'])
  }
};
</script>