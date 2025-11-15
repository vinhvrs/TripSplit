import SplitModel from '~/models/split.model'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

export const splitService = {
  async createSplit(data) {
    const split = new SplitModel(data)
    await split.save()
    return split
  },

  async getAllSplits(limit = 10, page = 1) {
    return await SplitModel.find()
      .sort({ updatedAt: -1 })
      .limit(limit ? parseInt(limit) : 0)
      .skip(page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0)
      .populate('group_id', 'name description')
      .populate('user_id', 'name email')
      .populate('pay_to.user_id', 'name email')
      .populate('get_pay_by.user_id', 'name email')
  },

  async getSplitsByGroupId(groupId, limit = 10, page = 1) {
    return await SplitModel.find({ group_id: groupId })
      .sort({ updatedAt: -1 })
      .limit(limit ? parseInt(limit) : 0)
      .skip(page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0)
      .populate('group_id', 'name description')
      .populate('user_id', 'name email')
      .populate('pay_to.user_id', 'name email')
      .populate('get_pay_by.user_id', 'name email')
  },

  async getSplitsByUserId(userId, limit = 10, page = 1) {
    return await SplitModel.find({ user_id: userId })
      .sort({ updatedAt: -1 })
      .limit(limit ? parseInt(limit) : 0)
      .skip(page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0)
      .populate('group_id', 'name description')
      .populate('user_id', 'name email')
      .populate('pay_to.user_id', 'name email')
      .populate('get_pay_by.user_id', 'name email')
  },

  async getSplitById(id) {
    const split = await SplitModel.findById(id)
      .populate('group_id', 'name description')
      .populate('user_id', 'name email')
      .populate('pay_to.user_id', 'name email')
      .populate('get_pay_by.user_id', 'name email')
    if (!split) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Split not found')
    }
    return split
  },

  async updateSplit(id, updateData) {
    const updated = await SplitModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate('group_id', 'name description')
      .populate('user_id', 'name email')
      .populate('pay_to.user_id', 'name email')
      .populate('get_pay_by.user_id', 'name email')
    if (!updated) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Split not found')
    }
    return updated
  },

  async deleteSplit(id) {
    const deleted = await SplitModel.findByIdAndDelete(id)
    if (!deleted) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Split not found')
    }
    return deleted
  }
}
