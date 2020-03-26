import axios from 'axios';

const Provider = {};
const endpoint = '/api/provider';


Provider.get = params => new Promise((resolve, reject) => {
  axios.get(endpoint, { params })
    .then(res => resolve(res.data))
    .catch(e => reject(e.response));
}); 

Provider.create = name => new Promise((resolve, reject) => {
  if (!name)
    return reject({ reason: "No name provided!"});

  axios.post(endpoint, { name })
    .then(res => resolve(res.data))
    .catch(e => reject(e.response));

});

Provider.update = options => new Promise((resolve, reject) => {
  if (!options || !options.name || !options.id) 
    return reject({ reason: "Some options are missing" });

  let params = { id: options.id };
  
  axios.put(endpoint, { name: options.name }, { params })
    .then(() => resolve())
    .catch(e => reject(e.response));
})

Provider.delete = params => new Promise((resolve, reject) => {
  axios.delete(endpoint, { params })
    .then(() => resolve())
    .catch(e => reject(e.response));
})

export default Provider;
