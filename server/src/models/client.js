const mongoose = require('mongoose');

const namePattern = /[a-z\d\s]{3,20}/i;
const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i;
const phonePattern = /^[\d-+]{7,12}$/;

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    match: namePattern
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailPattern
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: phonePattern
  },
  providers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true
  }]
})

module.exports = mongoose.model('CLient', clientSchema);