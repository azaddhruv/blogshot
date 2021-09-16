import express from 'express'
const app = express()
import path from 'path'
import mongoose from 'mongoose'
import Blog from './models/blog.js'
import ExpressError from './utils/ExpressError.js'
import catchAsync from './utils/catchAsync.js'
import session from 'express-session'
import Admin from './models/admin.js'
import bcrypt from 'bcrypt'
import { isLoggedIn, validateBlog } from './middleware.js'
import blogRoutes from './routes/blogs.js'
import mongoSanitize from 'express-mongo-sanitize'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())

const secret = process.env.SECRET || 'thisshouldbeabettersecret!'

const store = new MongoStore({
  mongoUrl:
    'mongodb+srv://stonkyLegs:stonkylegs@cluster0.9c1ek.mongodb.net/blog-app?',
  secret,
  touchAfter: 24 * 60 * 60,
})

store.on('error', function (err) {
  console.log('session store error', err)
})

const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}

app.use(session(sessionConfig))

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect(process.env.mongoURI)
}

app.use('/blog', blogRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).send(err.message)
})

app.listen(port, () => {
  console.log(`started listining on port ${port}`)
})
