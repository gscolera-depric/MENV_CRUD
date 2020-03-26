import axios from 'axios';

const endpoint = '/api/provider';
const Provider = { _id: '', name: '' };

Provider.get = params => new Promise((resolve, reject) => {
  let query = endpoint;

  if (params) 
    query = `${query}?${params}`;
  
  axios.get(query)
    .then(res => resolve(res.data))
    .catch(e => reject(e.response))
})

Provider.create = provider => new Promise((resolve, reject) => {
  axios.post(endpoint, {name: provider})
    .then(res => resolve(res.data))
    .catch(e => reject(e.response))
})

Provider.update = provider => new Promise((resolve, reject) => {
  let query = `${endpoint}?id=${provider.id}`;
  
  axios.put(query, { name: provider.name })
    then()
  
});

Provider.del = provider => new Promise((resolve, reject) => {
  axios.delete(`${endpoint}?id=${provider._id}`)
    .then(res => resolve())
    .catch(e => reject(e))
})

Provider.getOne = provider => new Promise((resolve, reject) => {
  axios.get(`${endpoint}?id=${provider._id}`)
    .then(res => resolve(res.data))
    .catch(e => reject(e))
})

export default Provider;