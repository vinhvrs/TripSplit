import express from 'express'
import { expenseController } from '~/controllers/expense.controller'
import { uploadImage } from '~/middlewares/upload.middleware'
import { expenseValidations } from '~/validations/expense.validation'

const Router = express.Router()

Router.post('/',
  uploadImage.array('images'),
  expenseValidations.createExpense,
  expenseController.createExpense)
Router.get('/:id',
  expenseValidations.getExpenseById,
  expenseController.getExpenseById)
Router.get('/',
  expenseController.getAllExpenses)
Router.put('/:id',
  uploadImage.array('images'),
  expenseValidations.updateExpense,
  expenseController.updateExpense)
Router.delete('/:id',
  expenseValidations.deleteExpense,
  expenseController.deleteExpense)

export const expenseRouter = Router