import express from 'express'
import { splitController } from '~/controllers/split.controller'

const Router = express.Router()

Router.post('/', splitController.createSplit)
Router.get('/', splitController.getAllSplits)
Router.get('/:id', splitController.getSplitById)
Router.put('/:id', splitController.updateSplit)
Router.delete('/:id', splitController.deleteSplit)

export const splitRouter = Router
