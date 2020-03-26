import Vue from 'vue';
import Vuex from 'vuex';

import Provider from './api/provider';
import Client from './api/client';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clients: [],
    providers: [],
    form: false,
    editedClient: null,
    client: {
      name: '',
      email: '',
      phone: '',
      providers: []
    },
    providersLoadError: false
  },
  getters: {
    loading: state => state.loading,
    clients: state => state.clients,
    providers: state => state.providers,
    formOpened: state => state.form,
    editedClient: state => state.editedClient,
    client: state => state.client
  },
  mutations: {
    saveProvidersToStore: (state, providers) => state.providers = providers,
    addProviderToStore: (state, provider) => state.providers.push(provider),
    removeProviderFromStore: (state, id) => {
      for (let i = 0; i < state.providers.length; i++)
        if (state.providers[i]._id == id) {
          state.providers.splice(i, 1)
          return
        }
    },
    saveClientsToStore: (state, clients) => state.clients = clients,
    addClientToStore: (state, client) => state.clients.push(client),
    removeCLientFromStore: (state, id) => {
      for (let i = 0; i < state.clients.length; i++)
        if (state.clients[i]._id == id) {
          state.clients.splice(i, 1)
          return
        }
    },
    toggleForm: state => state.form = !state.form,
    editedClient: state => state.editedClient,
    editClient: (state, client) => state.editedClient = client,
    finishEditOfClient: state => state.editedClient = null
  },
  actions: {
    loadClients: ({ commit }) => new Promise((_, reject) => {
      Client.get()
          .then(clients => commit('saveClientsToStore', clients))
          .catch(e => reject(e))
    }),
    deleteClient: ({ commit }, id) => {
      Client.delete(id)
        .then(() => commit('removeCLientFromStore', id))
        .catch(e => console.log(e))
    },
    loadProviders: ({ state, commit }) => new Promise(( _, reject) => {
      Provider.get()
        .then(providers => commit('saveProvidersToStore', providers))
        .catch(() => state.providersLoadError = true)
    }),
    createProvider: ({ commit }, provider) => new Promise((resolve, reject) => {
      Provider.create(provider)
        .then(provider => {
          commit('addProviderToStore', provider);
          resolve();
        })
        .catch(e => reject(e))
    }),
    createClient: ({ commit }, client) => new Promise((resolve, reject) => {
      Client.new(client)
        .then(client => {
          commit('addClientToStore', client);
          resolve();
        })
        .catch(e => reject(e))
    }),
    deleteProvider: ({ commit }, provider) => {
      Provider.del(provider)
        .then(() => commit('removeProviderFromStore', provider._id))
        .catch(e => console.log(e))
    }
  }
})