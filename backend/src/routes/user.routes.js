import express from 'express'
import { userController } from '../controllers/user.controller'

const Router = express.Router()

Router.put('/:id', userController.updateUser)

Router.get('/email/:email', userController.getUserByEmail)
Router.get('/:id', userController.getUserById)
Router.get('/', userController.getAllUsers)

export const userRouter = Router

