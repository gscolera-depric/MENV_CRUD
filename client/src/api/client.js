import axios from 'axios';

const endpoint = '/api/client';
const Client = {};

Client.get = params => new Promise((resolve, reject) => {
  axios.get(endpoint, { params })
    .then(res => resolve(res.data))
    .catch(e => reject(e));
});

Client.create = client => new Promise((resolve, reject) => {
  axios.post(endpoint, client)
    .then(res => resolve(res.data))
    .catch(e => reject(e.response))
});

Client.update = options => new Promise((resolve, reject) => {
  axios.put(endpoint, options.client, { params: options.params })
    .then(res => resolve(res.data))
    .catch(e => reject(e.response))
});

Client.delete = params => new Promise((resolve, reject) => {
  axios.delete(endpoint, { params })
    .then(() => resolve())
    .catch(e => reject(e.response))
})
export default Client;