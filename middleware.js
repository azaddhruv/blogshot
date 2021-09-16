import { blogSchema } from './schemas.js'
import ExpressError from './utils/ExpressError.js'

export const isLoggedIn = (req, res, next) => {
  if (!req.session.admin_id) {
    return res.json({ success: false, message: 'not logged in' })
  }
  next()
}

export const validateBlog = (req, res, next) => {
  const { error } = blogSchema.validate(req.body)
  if (error) {
    let msg = error.details.map((el) => el.message).join(', ')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}
