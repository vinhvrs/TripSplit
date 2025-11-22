import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators.js'

const CREATE_GROUP_VALIDATION = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().max(255).optional(),
  admin_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).optional(),
  user_ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).optional(),
  expenses_ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).optional()
})

const UPDATE_GROUP_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  name: Joi.string().min(3).max(30).optional(),
  description: Joi.string().max(255).optional(),
  admin_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).optional(),
  user_ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).optional(),
  expenses_ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).optional()
})

const ADD_USER_TO_GROUP_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  user_ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).required()
})

const REMOVE_USER_FROM_GROUP_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  user_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const ADD_EXPENSE_TO_GROUP_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  expense_ids: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).min(1).required()
})

const REMOVE_EXPENSE_FROM_GROUP_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  expense_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const JOIN_BY_INVITE_URL_VALIDATION = Joi.object({
  url: Joi.string().required(),
  user_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const GET_GROUP_BY_ID_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const GET_GROUP_BY_INVITE_URL_VALIDATION = Joi.object({
  url: Joi.string().required()
})

const DELETE_GROUP_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const createGroup = async (req, res, next) => {
  try {
    await CREATE_GROUP_VALIDATION.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const updateGroup = async (req, res, next) => {
  try {
    const id = req.params.id
    await UPDATE_GROUP_VALIDATION.validateAsync({ id, ...req.body })
    next()
  } catch (error) {
    next(error)
  }
}

const addUserToGroup = async (req, res, next) => {
  try {
    const id = req.params.id
    await ADD_USER_TO_GROUP_VALIDATION.validateAsync({ id, ...req.body })
    next()
  } catch (error) {
    next(error)
  }
}

const removeUserFromGroup = async (req, res, next) => {
  try {
    const id = req.params.id
    await REMOVE_USER_FROM_GROUP_VALIDATION.validateAsync({ id, ...req.body })
    next()
  } catch (error) {
    next(error)
  }
}

const addExpenseToGroup = async (req, res, next) => {
  try {
    const id = req.params.id
    await ADD_EXPENSE_TO_GROUP_VALIDATION.validateAsync({ id, ...req.body })
    next()
  } catch (error) {
    next(error)
  }
}

const removeExpenseFromGroup = async (req, res, next) => {
  try {
    const id = req.params.id
    await REMOVE_EXPENSE_FROM_GROUP_VALIDATION.validateAsync({ id, ...req.body })
    next()
  } catch (error) {
    next(error)
  }
}

const joinByInviteUrl = async (req, res, next) => {
  try {
    await JOIN_BY_INVITE_URL_VALIDATION.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const getGroupById = async (req, res, next) => {
  try {
    const id = req.params.id
    await GET_GROUP_BY_ID_VALIDATION.validateAsync({ id })
    next()
  } catch (error) {
    next(error)
  }
}

const getGroupByInviteUrl = async (req, res, next) => {
  try {
    await GET_GROUP_BY_INVITE_URL_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

const deleteGroup = async (req, res, next) => {
  try {
    await DELETE_GROUP_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

export const groupValidations = {
  createGroup,
  updateGroup,
  addUserToGroup,
  removeUserFromGroup,
  addExpenseToGroup,
  removeExpenseFromGroup,
  joinByInviteUrl,
  getGroupById,
  getGroupByInviteUrl,
  deleteGroup
}