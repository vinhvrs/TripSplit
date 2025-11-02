import express from 'express'
import { expenseController } from '~/controllers/expense.controller'
import { uploadImage } from '~/middlewares/upload.middleware'

const Router = express.Router()

Router.post('/', uploadImage.array('images'), expenseController.createExpense)
Router.get('/:id', expenseController.getExpenseById)
Router.get('/', expenseController.getAllExpenses)
Router.put('/:id', uploadImage.array('images'), expenseController.updateExpense)
Router.delete('/:id', expenseController.deleteExpense)

export const expenseRouter = Router