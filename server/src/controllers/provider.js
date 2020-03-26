const router = require('express').Router();
const { Provider } = require('../models');

router.route('/')
  .get(get)
  .post(create)
  .put(update)
  .delete(del)

function get(req, res) {
  if (req.query.name)
    return getByName(req.query.name, res);

  Provider.find().sort('name').exec((err, data) => {
    err ? res.status(500).json(err) : res.status(200).json(data)
  });
}

function create(req, res) {
  let provider = new Provider({ name: req.body.name });
 
  if (err = provider.validateSync())
    return res.status(400).json(err);

  provider.save()
    .then(() => res.status(200).json(provider))
    .catch(err => res.status(500).json(err))
}

function update(req, res) {
  if (!req.query.id)
    return res.status(400).json({ error: "No provider id in query"});

  Provider.findByIdAndUpdate(req.query.id, { name: req.body.name }).exec((err, data) => {
    return err ? res.status(500).json(err) : res.sendStatus(200)
  })
}

function del(req, res) {
  if (!req.query.id)
    return res.status(400).json({ error: "No provider id in query"});
  
  Provider.deleteOne({ _id: req.query.id }).exec(err => {
    return err ? res.status(500).json(err) : res.sendStatus(200)
  })
}

function getByName(name, res) {
  Provider.findOne({ name }).exec((err, provider) => {
    err ? res.sendStatus(500) : res.status(200).json(provider)
  });
}

module.exports = router;