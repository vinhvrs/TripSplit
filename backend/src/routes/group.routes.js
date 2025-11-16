import express from 'express'
import { groupController } from '../controllers/group.controller'
import { groupValidations } from '~/validations/group.validation'
import { verifyToken } from '../middlewares/auth.middleware'

const Router = express.Router()

Router.get('/invite/:url',
  groupValidations.getGroupByInviteUrl,
  groupController.getGroupByInviteUrl)
Router.get('/admin/me',
  verifyToken,
  groupController.getGroupsByAdminId)
Router.get('/:id',
  verifyToken,
  groupValidations.getGroupById,
  groupController.getGroupById)
Router.get('/',
  verifyToken,
  groupController.getAllGroups)

Router.post('/',
  verifyToken,
  groupValidations.createGroup,
  groupController.createGroup)
Router.put('/invite/:url',
  verifyToken,
  groupValidations.joinByInviteUrl,
  groupController.joinByInviteUrl)
Router.put('/:id/users',
  verifyToken,
  groupValidations.addUserToGroup,
  groupController.addUserToGroup)
Router.put('/:id/expenses',
  verifyToken,
  groupValidations.addExpenseToGroup,
  groupController.addExpenseToGroup)
Router.put('/:id',
  verifyToken,
  groupValidations.updateGroup,
  groupController.updateGroup)

Router.delete('/:id/users',
  verifyToken,
  groupValidations.removeUserFromGroup,
  groupController.removeUserFromGroup)
Router.delete('/:id/expenses',
  verifyToken,
  groupValidations.removeExpenseFromGroup,
  groupController.removeExpenseFromGroup)
Router.delete('/:id',
  verifyToken,
  groupValidations.deleteGroup,
  groupController.deleteGroup)

export const groupRouter = Router
