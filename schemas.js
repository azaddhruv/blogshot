const Joi = require('joi')

module.exports.blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
}).required()
