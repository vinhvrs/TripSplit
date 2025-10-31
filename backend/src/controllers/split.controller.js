import { splitService } from '~/services/split.service'
import { StatusCodes } from 'http-status-codes'

export const splitController = {
  async createSplit(req, res, next) {
    try {
      const newSplit = await splitService.createSplit(req.body)
      res.status(StatusCodes.CREATED).json(newSplit)
    } catch (error) {
      next(error)
    }
  },

  async getAllSplits(req, res, next) {
    try {
      const splits = await splitService.getAllSplits()
      res.status(StatusCodes.OK).json(splits)
    } catch (error) {
      next(error)
    }
  },

  async getSplitById(req, res, next) {
    try {
      const split = await splitService.getSplitById(req.params.id)
      res.status(StatusCodes.OK).json(split)
    } catch (error) {
      next(error)
    }
  },

  async updateSplit(req, res, next) {
    try {
      const updated = await splitService.updateSplit(req.params.id, req.body)
      res.status(StatusCodes.OK).json(updated)
    } catch (error) {
      next(error)
    }
  },

  async deleteSplit(req, res, next) {
    try {
      const deleted = await splitService.deleteSplit(req.params.id)
      res.status(StatusCodes.OK).json(deleted)
    } catch (error) {
      next(error)
    }
  }
}
