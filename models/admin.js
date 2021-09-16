import mongoose from 'mongoose'

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

export default mongoose.model('Admin', adminSchema)
