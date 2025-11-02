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
    const expense = await ExpenseModel.findById(expenseId).populate('paid_by', 'paid_for', '-password')
    if (!expense) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Expense not found')
    }
    return expense
  },

  async getAllExpenses() {
    return await ExpenseModel.find().populate('paid_by', 'paid_for', '-password')
  },

  async updateExpense(expenseId, updateData) {
    const expense = await ExpenseModel.findByIdAndUpdate(
      expenseId,
      updateData,
      { new: true }
    ).populate('paid_by', '-password')
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
