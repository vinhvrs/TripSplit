import express from 'express'
import { expenseController } from '~/controllers/expense.controller'

const Router = express.Router()

Router.post('/', expenseController.createExpense)
Router.get('/:id', expenseController.getExpenseById)
Router.get('/', expenseController.getAllExpenses)
Router.put('/:id', expenseController.updateExpense)
Router.delete('/:id', expenseController.deleteExpense)

export const expenseRouter = Router