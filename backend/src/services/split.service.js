import SplitModel from '~/models/split.model'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

export const splitService = {
  async createSplit(data) {
    const split = new SplitModel(data)
    await split.save()
    return split
  },

  async getAllSplits() {
    return await SplitModel.find()
      .populate('group_id')
      .populate('user_id', '-password')
      .populate('pay_to.user_id', '-password')
      .populate('get_pay_by.user_id', '-password')
  },

  async getSplitById(id) {
    const split = await SplitModel.findById(id)
      .populate('group_id')
      .populate('user_id', '-password')
      .populate('pay_to.user_id', '-password')
      .populate('get_pay_by.user_id', '-password')
    if (!split) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Split not found')
    }
    return split
  },

  async updateSplit(id, updateData) {
    const updated = await SplitModel.findByIdAndUpdate(id, updateData, { new: true })
      .populate('group_id')
      .populate('user_id', '-password')
      .populate('pay_to.user_id', '-password')
      .populate('get_pay_by.user_id', '-password')
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
