import express from 'express'
import { groupController } from '../controllers/group.controller'

const Router = express.Router()

Router.get('/:id', groupController.getGroupById)
Router.get('/', groupController.getAllGroups)

Router.post('/', groupController.createGroup)
Router.post('/users/:id', groupController.addUserToGroup)
Router.post('/expenses/:id', groupController.addExpenseToGroup)
Router.put('/:id', groupController.updateGroup)

Router.delete('/users/:id', groupController.removeUserFromGroup)
Router.delete('/expenses/:id', groupController.removeExpenseFromGroup)

export const groupRouter = Router
