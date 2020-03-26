<template> 
<b-container id="app" style="height: 100vh" class="px-0">
   <preloader v-if="loading"/>
   <client-list @error="showErrorMessage" v-else/>
   <client-form @error="showErrorMessage" />
 </b-container>
</template>

<script>
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import Preloader from './components/Preloader';
import { Client, Provider } from './api';
import { mapMutations } from 'vuex';
export default {
  name: "App",
  components: {
    ClientForm,
    ClientList,
    Preloader
  },
  data: () => ({
    loading: true,
    clientToUpdate: null
  }),
  methods: {
    ...mapMutations(['saveClients', 'saveProviders']),
    showErrorMessage() {
      console.log('Ok')
      let msg = "It seems like something went wrong. Please try again later...";
      let options = {
        title: 'Error occured!',
        buttonSize: 'sm',
        headerClass: 'text-danger',
        centered: true,
        okVariant: 'danger'
      };

      this.$bvModal.msgBoxOk(msg, options);
    }
  },
  created() {
    Provider.get()
      .then(providers => this.saveProviders(providers))
      .catch(e => console.log(e));

    Client.get()
      .then(clients => this.saveClients(clients))
      .catch(e => console.log(e))
      .finally(() => this.loading = false);
  }
 
};
</script>
<style>
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.pointer:hover {
  cursor: pointer;
}

</style>
