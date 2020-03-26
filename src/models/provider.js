const mongoose = require('mongoose');

const namePattern = /[a-z\d\s]{3,20}/i;

const providerSchema = {
  name: {
    type: String,
    required: true,
    match: namePattern,
    unique: true
  }
}

module.exports = mongoose.model('Provider', providerSchema);