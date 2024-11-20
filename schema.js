const Joi = require('joi');

const taskValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  status: Joi.string().valid('pending', 'in_progress', 'completed').default('pending'),
});

module.exports = taskValidationSchema;
