import express from 'express'
const router = express.Router()
import catchAsync from '../utils/catchAsync.js'
import { isLoggedIn, validateBlog } from '../middleware.js'
import Blog from '../models/blog.js'
import Admin from '../models/admin.js'
import bcrypt from 'bcrypt'

router.get(
  '/',
  catchAsync(async (req, res) => {
    const blog = await Blog.find({})
    res.json({ success: true, blog })
  })
)

router.get(
  '/currentadmin',
  catchAsync(async (req, res) => {
    if (req.session.admin) {
      return res.json({
        success: true,
        admin: req.session.admin,
      })
    }
    return res.json({ success: false })
  })
)

router.post(
  '/',
  isLoggedIn,
  validateBlog,
  catchAsync(async (req, res) => {
    const { title, content, category } = req.body
    const blog = await new Blog({ title, content, category })
    await blog.save()
    res.json({ success: true, message: 'successfully created a blog' })
  })
)

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (blog) {
      res.json({ success: true, blog })
    } else {
      res.json({ success: false })
    }
  } catch (err) {
    res.json({ message: err.message })
  }
})

router.put(
  '/:id',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndUpdate(id, { ...req.body })
    const updated = await blog.save()
    res.json({ success: true })
  })
)

router.delete(
  '/:id',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params
    await Blog.findByIdAndDelete(id)
    res.json({ success: true, message: 'deleted successfully' })
  })
)

router.post(
  '/admin/login',
  catchAsync(async (req, res) => {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username })
    const validPassword = await bcrypt.compare(password, admin.password)
    if (validPassword) {
      req.session.admin_id = admin._id
      req.session.admin = admin.username
      res.json({
        success: true,
        message: 'admin logged in',
        admin: req.session.admin,
      })
    }
  })
)

router.post(
  '/admin/logout',
  catchAsync(async (req, res) => {
    req.session.destroy()
    res.json({ success: true, message: 'Logged out' })
  })
)

export default router
