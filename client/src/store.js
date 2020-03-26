import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clients: [],
    providers: [],
    client: null
  },
  getters: {
    clients: state => state.clients,
    client: state => state.client,
    providers: state => state.providers,
  },
  mutations: {
    saveClients: (state, clients) => state.clients = clients,
    saveProviders: (state, providers) => state.providers = providers,
    removeCLientFromStore: (state, id) => {
      for (let i = 0; i < state.clients.length; i++)
        if (state.clients[i]._id == id) {
          state.clients.splice(i, 1)
          return
        }
    },
    addClientToStore: (state, client) => state.clients.push(client),
    addProviderToStore: (state, provider) => state.providers.push(provider),
    removeProviderFromStore: (state, id) => {
      for (let i = 0; i < state.providers.length; i++)
        if (state.providers[i]._id == id) {
          state.providers.splice(i, 1)
          return
        }
    },
    updateClientAtStore: (state, client) => {
      for (let i = 0; i < state.clients.length; i++)
        if (state.clients[i]._id === client._id) 
          return state.clients[i] = {...client}
        
    },
    updateProviderAtStore: (state, options) => {
      for (let i = 0; i < state.providers.length; i++)
        if (state.providers[i]._id === options.id)
          return state.providers[i].name = options.name
    },
    rememberClient: (state, client) => state.client = client,
    forgetClient: state => state.client = null
  },
  actions: {

  }
})