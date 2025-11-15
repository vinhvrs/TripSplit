import express from 'express'
import { groupController } from '../controllers/group.controller'
import { groupValidations } from '~/validations/group.validation'

const Router = express.Router()

Router.get('/invite/:url',
  groupValidations.getGroupByInviteUrl,
  groupController.getGroupByInviteUrl)
Router.get('/:id',
  groupValidations.getGroupById,
  groupController.getGroupById)
Router.get('/',
  groupController.getAllGroups)

Router.post('/',
  groupValidations.createGroup,
  groupController.createGroup)
Router.put('/invite/:url',
  groupValidations.joinByInviteUrl,
  groupController.joinByInviteUrl)
Router.put('/:id/users',
  groupValidations.addUserToGroup,
  groupController.addUserToGroup)
Router.put('/:id/expenses',
  groupValidations.addExpenseToGroup,
  groupController.addExpenseToGroup)
Router.put('/:id',
  groupValidations.updateGroup,
  groupController.updateGroup)

Router.delete('/:id/users',
  groupValidations.removeUserFromGroup,
  groupController.removeUserFromGroup)
Router.delete('/:id/expenses',
  groupValidations.removeExpenseFromGroup,
  groupController.removeExpenseFromGroup)

export const groupRouter = Router
