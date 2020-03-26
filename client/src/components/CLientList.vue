<template>
  <b-container class="d-flex flex-column align-items-center justify-content-start pt-md-5">
    <b-row class="bg-secondary w-100 px-2 py-2 text-white" align-v="center" align-h="between">
      <strong>Clients</strong>
      <b-btn @click="$bvModal.show('client-form')" size="sm">
        <b-icon-person-plus-fill scale="1.2" />
      </b-btn>
    </b-row>
    <b-table :fields="fields" :items="clients" primary-key="name" stacked="md" outlined>
      <template v-slot:cell(name)="data">{{ data.item.name }}</template>
      <template v-slot:cell(email)="data">{{ data.item.email }}</template>
      <template v-slot:cell(phone)="data">{{ data.item.phone }}</template>
      <template v-slot:cell(providers)="data">
        <span 
          v-for="provider in data.item.providers" 
          :key="provider.id"
        >{{ `${provider.name}, ` }}</span>
      </template>
      <template v-slot:cell(actions)="data">
        <b-button-group size="sm">
          <b-btn>
            <b-icon-pencil class="bg-secodary" />
          </b-btn>
          <b-btn @click="deleteClient(data.item._id)">
            <b-icon-trash class="bg-secodary" />
          </b-btn>
        </b-button-group>
      </template>
    </b-table>
    <span class="text-secondary" v-if="!clients.length">No clients in database...</span>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ClientList",
  data: () => ({
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
    ...mapGetters(["clients"])
  },
  methods: {
    ...mapActions(["deleteClient"])
  }
};
</script>