import express from 'express'
import { groupController } from '../controllers/group.controller'

const Router = express.Router()

Router.get('/:id', groupController.getGroupById)
Router.get('/', groupController.getAllGroups)

Router.post('/', groupController.createGroup)
Router.get('/invite/:url', groupController.getGroupByInviteUrl)
Router.put('/invite/:url', groupController.joinByInviteUrl)
Router.put('/:id/users', groupController.addUserToGroup)
Router.put('/:id/expenses', groupController.addExpenseToGroup)
Router.put('/:id', groupController.updateGroup)

Router.delete('/:id/users', groupController.removeUserFromGroup)
Router.delete('/:id/expenses', groupController.removeExpenseFromGroup)

export const groupRouter = Router
