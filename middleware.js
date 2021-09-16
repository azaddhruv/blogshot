const { blogSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError.js')

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.admin_id) {
    return res.json({ success: false, message: 'not logged in' })
  }
  next()
}

module.exports.validateBlog = (req, res, next) => {
  const { error } = blogSchema.validate(req.body)
  if (error) {
    let msg = error.details.map((el) => el.message).join(', ')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}
