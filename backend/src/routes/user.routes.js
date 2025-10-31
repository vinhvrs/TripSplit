import express from 'express'
import { userController } from '../controllers/user.controller'

const Router = express.Router()

Router.post('/register', userController.register)
Router.post('/login', userController.login)
Router.put('/:id', userController.updateUser)

Router.get('/email/:email', userController.getUserByEmail)
Router.get('/:id', userController.getUserById)
Router.get('/', userController.getAllUsers)

export const userRouter = Router

