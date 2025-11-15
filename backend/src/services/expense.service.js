import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import ExpenseModel from '~/models/expense.model'

export const expenseService = {
  async createExpense(expenseData) {
    const newExpense = new ExpenseModel(expenseData)
    await newExpense.save()
    return newExpense
  },

  async getExpenseById(expenseId) {
    const expense = await ExpenseModel.findById(expenseId).populate('paid_by', '-password').populate('paid_for', '-password')
    if (!expense) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Expense not found')
    }
    return expense
  },

  async getAllExpenses(limit = 10, page = 1) {
    const expense = await ExpenseModel.find()
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0)
      .skip(page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0)
      .populate('paid_by', '-password')
      .populate('paid_for', '-password')
    return expense
  },

  async updateExpense(expenseId, updateData) {
    const expense = await ExpenseModel.findByIdAndUpdate(
      expenseId,
      updateData,
      { new: true }
    )
    if (!expense) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Expense not found')
    }
    return expense
  },

  async deleteExpense(expenseId) {
    const expense = await ExpenseModel.findByIdAndDelete(expenseId)
    if (!expense) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Expense not found')
    }
    return expense
  }
}
