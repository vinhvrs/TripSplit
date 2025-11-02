import { StatusCodes } from 'http-status-codes'
import { expenseService } from '../services/expense.service'

export const expenseController = {
  async createExpense(req, res, next) {
    try {
      const newExpense = await expenseService.createExpense(req.body)
      res.status(StatusCodes.CREATED).json(newExpense)
    } catch (error) {
      next(error)
    }
  },

  async getExpenseById(req, res, next) {
    try {
      const expenseId = req.params.id
      const expense = await expenseService.getExpenseById(expenseId)
      res.status(StatusCodes.OK).json(expense)
    } catch (error) {
      next(error)
    }
  },

  async getAllExpenses(req, res, next) {
    try {
      const expenses = await expenseService.getAllExpenses()
      res.status(StatusCodes.OK).json(expenses)
    } catch (error) {
      next(error)
    }
  },

  async updateExpense(req, res, next) {
    try {
      const expenseId = req.params.id
      const images = req.files
      const updateData = req.body
      if (images) {
        updateData.images = images.map(file => file.path)
      }
      const updatedExpense = await expenseService.updateExpense(expenseId, updateData)
      res.status(StatusCodes.OK).json(updatedExpense)
    }
    catch (error) {
      next(error)
    }
  },

  async deleteExpense(req, res, next) {
    try {
      const expenseId = req.params.id
      await expenseService.deleteExpense(expenseId)
      res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      next(error)
    }
  }
}