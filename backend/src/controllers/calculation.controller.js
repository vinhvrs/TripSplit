import { StatusCodes } from 'http-status-codes'
import { calculationService } from '~/services/calculation.service'

export const calculationController = {
  async calculateUserBalances(req, res, next) {
    try {
      const groupId = req.params.groupId
      const balances = await calculationService.calculateUserBalances(groupId)
      res.status(StatusCodes.OK).json(balances)
    } catch (error) {
      next(error)
    }
  },

  async splitTransactions(req, res, next) {
    try {
      const groupId = req.params.groupId
      const transactions = await calculationService.splitTransactions(groupId)
      res.status(StatusCodes.OK).json(transactions)
    } catch (error) {
      next(error)
    }
  },

  async settleUp(req, res, next) {
    try {
      const groupId = req.params.groupId
      const settlements = await calculationService.saveSettlementToSplits(groupId)
      res.status(StatusCodes.OK).json(settlements)
    } catch (error) {
      next(error)
    }
  }
}