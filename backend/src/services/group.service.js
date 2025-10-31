import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

import GroupModel from '~/models/group.model'

export const groupService = {
  async createGroup(groupData) {
    const newGroup = new GroupModel(groupData)
    if (groupData.expenses_ids === undefined) {
      newGroup.expenses_ids = []
    }
    await newGroup.save()
    return newGroup
  },

  async getGroupById(groupId) {
    const group = await GroupModel.findById(groupId).populate('user_ids', '-password')
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    return group
  },

  async getAllGroups() {
    return await GroupModel.find().populate('user_ids', '-password')
  },

  async updateGroup(groupId, updateData) {
    const group = await GroupModel.findByIdAndUpdate(
      groupId,
      updateData,
      { new: true }
    ).populate('user_ids', '-password')
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    return group
  },

  async addUserToGroup(groupId, userId) {
    const group = await GroupModel.findById(groupId)
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    if (Array.isArray(userId)) {
      const idsToAdd = userId.filter(id =>
        !group.user_ids.some(existing => existing.toString() === id.toString())
      )
      if (idsToAdd.length) {
        group.user_ids.push(...idsToAdd)
        await group.save()
      }
    } else if (!group.user_ids.some(id => id.toString() === userId.toString())) {
      group.user_ids.push(userId)
      await group.save()
    }
    return group
  },

  async removeUserFromGroup(groupId, userId) {
    const group = await GroupModel.findById(groupId)
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    group.user_ids = group.user_ids.filter(id => id.toString() !== userId.toString())
    await group.save()
    return group
  },

  async addExpenseToGroup(groupId, expenseId) {
    const group = await GroupModel.findById(groupId)
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    if (Array.isArray(expenseId)) {
      const idsToAdd = expenseId.filter(id =>
        !group.expenses_ids.some(existing => existing.toString() === id.toString())
      )
      if (idsToAdd.length) {
        group.expenses_ids.push(...idsToAdd)
        await group.save()
      }
    } else if (!group.expenses_ids.some(id => id.toString() === expenseId.toString())) {
      group.expenses_ids.push(expenseId)
      await group.save()
    }
    return group
  },

  async removeExpenseFromGroup(groupId, expenseId) {
    const group = await GroupModel.findById(groupId)
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    group.expenses_ids = group.expenses_ids.filter(id => id.toString() !== expenseId.toString())
    await group.save()
    return group
  },

  async deleteGroup(groupId) {
    const group = await GroupModel.findByIdAndDelete(groupId)
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    return group
  }
}