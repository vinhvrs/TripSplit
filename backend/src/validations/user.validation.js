import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators.js'

const CREATE_USER_VALIDATION = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

const UPDATE_USER_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional()
})

const GET_USER_BY_ID_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const DELETE_USER_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const createUser = async (req, res, next) => {
  try {
    await CREATE_USER_VALIDATION.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    await UPDATE_USER_VALIDATION.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    await GET_USER_BY_ID_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await DELETE_USER_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

export const userValidations = {
  createUser,
  updateUser,
  getUserById,
  deleteUser
}