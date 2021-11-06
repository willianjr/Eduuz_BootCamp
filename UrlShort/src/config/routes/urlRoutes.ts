import { Router } from 'express'

import URLController from '../../api/controllers/urlController'

const routes = Router()

/* ROUTES URL -=> API/URL */
routes.post('/shorten', URLController.shorten)
routes.get('/:hash', URLController.redirect)

export default routes
