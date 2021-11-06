import { Router } from 'express'

import URLRoutes from './urlRoutes'
//import TarifasRoutes from './tarifasRoutes'

const routes = Router()

routes.use('/', URLRoutes)
//routes.use('/Tarifas', TarifasRoutes)

export default routes
