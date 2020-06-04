import express from 'express'

import PointsController from './controlers/pointsController'
import ItemsController from './controlers/itemsController'

const routes = express.Router()
const pointsController = new PointsController
const itemsController = new ItemsController

routes.get('/items', itemsController.index)

routes.post('/points', pointsController.create)
routes.get('/points/:id', pointsController.show)

export default routes