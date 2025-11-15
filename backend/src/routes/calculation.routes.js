import express from 'express'
import { calculationController } from '~/controllers/calculation.controller'

const Router = express.Router()

Router.get('/balances/:groupId', calculationController.calculateUserBalances)
Router.get('/split/:groupId', calculationController.splitTransactions)
Router.post('/settle-up/:groupId', calculationController.settleUp)
export const calculationRouter = Router