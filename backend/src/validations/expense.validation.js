import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators.js'

const CREATE_EXPENSE_VALIDATION = Joi.object({
  description: Joi.string().max(255).optional(),
  amount: Joi.number().positive().required(),
  paid_by: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).min(1).required(),
  paid_for: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).min(1).required(),
  images: Joi.array().items(Joi.string().uri()).optional()
})

const UPDATE_EXPENSE_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  description: Joi.string().max(255).optional(),
  amount: Joi.number().positive().optional(),
  paid_by: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).min(1).optional(),
  paid_for: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).min(1).optional(),
  images: Joi.array().items(Joi.string().uri()).optional()
})

const GET_EXPENSE_BY_ID_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const DELETE_EXPENSE_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const createExpense = async (req, res, next) => {
  try {
    await CREATE_EXPENSE_VALIDATION.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const updateExpense = async (req, res, next) => {
  try {
    await UPDATE_EXPENSE_VALIDATION.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const getExpenseById = async (req, res, next) => {
  try {
    await GET_EXPENSE_BY_ID_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

const deleteExpense = async (req, res, next) => {
  try {
    await DELETE_EXPENSE_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

export const expenseValidations = {
  createExpense,
  updateExpense,
  getExpenseById,
  deleteExpense
}