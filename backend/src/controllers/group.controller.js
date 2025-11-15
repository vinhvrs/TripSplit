import { StatusCodes } from 'http-status-codes'
import { groupService } from '../services/group.service'

export const groupController = {
  async createGroup(req, res, next) {
    try {
      const newGroup = await groupService.createGroup(req.body)
      res.status(StatusCodes.CREATED).json(newGroup)
    } catch (error) {
      next(error)
    }
  },

  async getGroupById(req, res, next) {
    try {
      const groupId = req.params.id
      const group = await groupService.getGroupById(groupId)
      res.status(StatusCodes.OK).json(group)
    } catch (error) {
      next(error)
    }
  },

  async getAllGroups(req, res, next) {
    try {
      const { limit, page } = req.query;
      const groups = await groupService.getAllGroups(limit, page)
      res.status(StatusCodes.OK).json(groups)
    } catch (error) {
      next(error)
    }
  },

  async updateGroup(req, res, next) {
    try {
      const groupId = req.params.id
      const updateData = req.body
      const updatedGroup = await groupService.updateGroup(groupId, updateData)
      res.status(StatusCodes.OK).json(updatedGroup)
    } catch (error) {
      next(error)
    }
  },

  async getGroupByInviteUrl(req, res, next) {
    try {
      const url = req.params.url
      const group = await groupService.getGroupByInviteUrl(url)
      res.status(StatusCodes.OK).json(group)
    } catch (error) {
      next(error)
    }
  },

  async joinByInviteUrl(req, res, next) {
    try {
      const url = req.params.url
      const userId = req.body.user_id
      const updatedGroup = await groupService.joinByInviteUrl(url, userId)
      res.status(StatusCodes.OK).json(updatedGroup)
    } catch (error) {
      next(error)
    }
  },

  async addUserToGroup(req, res, next) {
    try {
      const groupId = req.params.id
      const userIds = req.body.user_ids
      const updatedGroup = await groupService.addUserToGroup(groupId, userIds)
      res.status(StatusCodes.OK).json(updatedGroup)
    } catch (error) {
      next(error)
    }
  },

  async removeUserFromGroup(req, res, next) {
    try {
      const groupId = req.params.id
      const userId = req.body.user_id
      const updatedGroup = await groupService.removeUserFromGroup(groupId, userId)
      res.status(StatusCodes.OK).json(updatedGroup)
    } catch (error) {
      next(error)
    }
  },

  async addExpenseToGroup(req, res, next) {
    try {
      const groupId = req.params.id
      const expenseIds = req.body.expense_ids
      const updatedGroup = await groupService.addExpenseToGroup(groupId, expenseIds)
      res.status(StatusCodes.OK).json(updatedGroup)
    } catch (error) {
      next(error)
    }
  },

  async removeExpenseFromGroup(req, res, next) {
    try {
      const groupId = req.params.id
      const expenseId = req.body.expense_id
      const updatedGroup = await groupService.removeExpenseFromGroup(groupId, expenseId)
      res.status(StatusCodes.OK).json(updatedGroup)
    }
    catch (error) {
      next(error)
    }
  }
}