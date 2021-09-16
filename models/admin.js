const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true,
  },
  username: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
})

module.exports = mongoose.model('Admin', adminSchema)
