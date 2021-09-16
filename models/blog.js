const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: 'string',
    required: true,
  },
  category: {
    type: 'string',
    required: true,
  },
  content: {
    type: 'string',
    required: true,
  },
  date: {
    type: 'date',
    default: new Date(),
  },
})

module.exports = mongoose.model('Blog', blogSchema)
