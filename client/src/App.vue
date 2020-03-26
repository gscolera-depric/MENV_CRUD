<template>
 <b-container id="app" style="height: 100vh" class="px-0">
   <preloader v-if="loading"/>
   <client-list v-else/>
   <client-form />
 </b-container>
</template>

<script>
import ClientList from './components/CLientList';
import ClientForm from './components/ClientForm';
import Preloader from './components/Preloader';
import { Client, Provider } from './api';
import { mapActions } from 'vuex';
export default {
  name: "App",
  components: {
    ClientForm,
    ClientList,
    Preloader
  },
  data: () => ({
    loading: true
  }),
  methods: {
    ...mapActions(['loadProviders', 'loadClients']),

  },
  created() {
    this.loadClients().finally(this.loading = false);
    this.loadProviders();
  },
  mounted() {
    this.$bvModal.show('client-form');
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
  transform: scale(1.1);
}

</style>
