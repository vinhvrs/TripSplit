import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import GroupModel from '~/models/group.model'
import crypto from 'crypto'

export const groupService = {
  async createGroup(groupData) {
    const admin_id = groupData.admin_id || groupData.user_ids?.[0]
    groupData.admin_id = admin_id
    const url = crypto.randomUUID()
    groupData.url_invite = url

    // Ensure creator is always added to user_ids
    if (!groupData.user_ids) {
      groupData.user_ids = []
    }
    if (!groupData.user_ids.includes(admin_id)) {
      groupData.user_ids.push(admin_id)
    }

    const newGroup = new GroupModel(groupData)
    if (groupData.expenses_ids === undefined) {
      newGroup.expenses_ids = []
    }
    await newGroup.save()
    return newGroup
  },

  async getGroupById(groupId) {
    const group = await GroupModel.findById(groupId)
      .populate({
        path: 'expenses_ids',
        populate: [
          { path: 'paid_by', select: '-password' },
          { path: 'paid_for', select: '-password' }
        ]
      })
      .populate('user_ids', '-password')
      .populate('admin_id', '-password')
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    return group
  },

  async getAllGroups(limit = 10, page = 1) {
    const groups = await GroupModel.find()
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0)
      .skip(page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0)
      .populate('user_ids', '-password')
    return groups
  },

  async getGroupsByUserId(userId, limit = 10, page = 1) {
    const groups = await GroupModel.find({
      $or: [{ admin_id: userId }, { user_ids: userId }]
    })
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0)
      .skip(page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0)
      .populate({
        path: 'expenses_ids',
        populate: [
          { path: 'paid_by', select: '-password' },
          { path: 'paid_for', select: '-password' }
        ]
      })
      .populate('user_ids', '-password')
      .populate('admin_id', '-password')
    return groups
  },

  async updateGroup(groupId, updateData) {
    const group = await GroupModel.findOne({
      _id: groupId
    }).populate('user_ids', '-password')
    const admin_id = updateData.admin_id
    if (admin_id && group.admin_id.toString() !== admin_id.toString()) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Only the admin can update the group')
    }
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }

    Object.assign(group, updateData)
    await group.save()

    return group
  },

  async getGroupByInviteUrl(url) {
    const group = await GroupModel.findOne({ url_invite: url }).populate('user_ids', '-password')
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    return group
  },

  async joinByInviteUrl(url, userId) {
    const group = await GroupModel.findOne({ url_invite: url })
    if (!group) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Group not found')
    }
    if (!group.user_ids.some(id => id.toString() === userId.toString())) {
      group.user_ids.push(userId)
      await group.save()
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
    if (!expenseId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Expense ID is required')
    }
    if (!group.expenses_ids) {
      group.expenses_ids = []
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