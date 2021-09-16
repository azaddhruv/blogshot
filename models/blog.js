import mongoose from 'mongoose'

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

export default mongoose.model('Blog', blogSchema)
