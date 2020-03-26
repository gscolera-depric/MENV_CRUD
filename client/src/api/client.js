import axios from 'axios';

const endpoint = '/api/client';
const Client = {};

Client.get = params => new Promise((resolve, reject) => {
  let query = endpoint;

  if (params)
    query = `${query}?${params}`;

  axios.get(query)
    .then(res => resolve(res.data))
    .catch(e => reject(e));
});

Client.new = client => new Promise((resolve, reject) => {
  axios.post(endpoint, client)
    .then(res => resolve(res.data))
    .catch(e => reject(e.response))
});

Client.update = client => new Promise((resolve, reject) => {
  resolve()
});

Client.delete = id => new Promise((resolve, reject) => {
  axios.delete(`${endpoint}?id=${id}`)
    .then(() => resolve())
    .catch(e => reject(e.response))
})
export default Client;