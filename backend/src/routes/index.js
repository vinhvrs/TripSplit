import express from 'express'
import { userRouter } from './user.routes'
import { expenseRouter } from './expense.routes'
import { groupRouter } from './group.routes'
import { splitRouter } from './split.routes'
import { authRouter } from './auth.routes.js'
import { calculationRouter } from './calculation.routes.js'

const Router = express.Router()


Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'API is running' })
})

Router.use('/users', userRouter)
Router.use('/expenses', expenseRouter)
Router.use('/groups', groupRouter)
Router.use('/splits', splitRouter)
Router.use('/auth', authRouter)
Router.use('/settlements', calculationRouter)

export const APIs = Router
