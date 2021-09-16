import mongoose from 'mongoose'
import Admin from './admin.js'
import bcrypt from 'bcrypt'

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect('mongodb://localhost:27017/blog-app')
}

const createAdmin = async () => {
  const hash = await bcrypt.hash('231219', 12)
  const admin = await new Admin({
    name: 'Dhruv',
    username: 'azaddhruv',
    password: hash,
  })
  const result = await admin.save()
  console.log(result)
}

createAdmin()
