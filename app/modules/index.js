const Joi = require('joi')
const Module = require('./base')

const Task = new Module(
  'Task',
  Joi.object().keys({
    _id: Joi.any(),
    task: Joi.string().min(3),
    status: Joi.any().default('todo').valid(['todo', 'done'])
  }),
  []
)

module.exports = {
  Task
}
