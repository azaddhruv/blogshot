const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Blog = require('./models/blog.js')
const ExpressError = require('./utils/ExpressError.js')
const catchAsync = require('./utils/catchAsync.js')
const session = require('express-session')
const Admin = require('./models/admin.js')
const bcrypt = require('bcrypt')
const { isLoggedIn, validateBlog } = require('./middleware.js')
const blogRoutes = require('./routes/blogs.js')
const mongoSanitize = require('express-mongo-sanitize')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv').config()

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

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`started blogshot on port ${port}`)
})
