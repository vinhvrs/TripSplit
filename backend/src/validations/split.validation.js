import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators.js'

const CREATE_SPLIT_VALIDATION = Joi.object({
  group_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  user_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  pay_to: Joi.array().items(Joi.object({
    user_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    amount: Joi.number().min(0).required()
  })).required(),
  get_pay_by: Joi.array().items(Joi.object({
    user_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    amount: Joi.number().min(0).required()
  })).required()
})

const UPDATE_SPLIT_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  pay_to: Joi.array().items(Joi.object({
    user_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    amount: Joi.number().min(0).required()
  })).required(),
  get_pay_by: Joi.array().items(Joi.object({
    user_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    amount: Joi.number().min(0).required()
  })).required()
})

const GET_SPLIT_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const DELETE_SPLIT_VALIDATION = Joi.object({
  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const GET_SPLITS_BY_GROUP_ID_VALIDATION = Joi.object({
  group_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const GET_SPLITS_BY_USER_ID_VALIDATION = Joi.object({
  user_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})

const getSplit = async (req, res, next) => {
  try {
    await GET_SPLIT_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

const getSplitsByGroupId = async (req, res, next) => {
  try {
    await GET_SPLITS_BY_GROUP_ID_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

const getSplitsByUserId = async (req, res, next) => {
  try {
    await GET_SPLITS_BY_USER_ID_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

const createSplit = async (req, res, next) => {
  try {
    await CREATE_SPLIT_VALIDATION.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const updateSplit = async (req, res, next) => {
  try {
    await UPDATE_SPLIT_VALIDATION.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

const deleteSplit = async (req, res, next) => {
  try {
    await DELETE_SPLIT_VALIDATION.validateAsync(req.params)
    next()
  } catch (error) {
    next(error)
  }
}

export const splitValidations = {
  createSplit,
  updateSplit,
  getSplit,
  deleteSplit,
  getSplitsByGroupId,
  getSplitsByUserId
}