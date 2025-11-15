import express from 'express'
import { splitController } from '~/controllers/split.controller'
import { splitValidations } from '~/validations/split.validation'

const Router = express.Router()

Router.get('/', splitController.getAllSplits)
Router.get('/group/:id', splitValidations.getSplitsByGroupId, splitController.getSplitsByGroupId)
Router.get('/user/:id', splitValidations.getSplitsByUserId, splitController.getSplitsByUserId)
Router.get('/:id', splitValidations.getSplitById, splitController.getSplitById)
Router.post('/', splitValidations.createSplit, splitController.createSplit)
Router.put('/:id', splitValidations.updateSplit, splitController.updateSplit)
Router.delete('/:id', splitValidations.deleteSplit, splitController.deleteSplit)
export const splitRouter = Router
