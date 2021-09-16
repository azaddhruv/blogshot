import Joi from 'joi'

const blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
}).required()

export { blogSchema }
