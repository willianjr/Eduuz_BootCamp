import './config/index'
import 'reflect-metadata'

import App from './config/app'
import DataBase from './database'

const port = process.env.PORT || 3032

App.listen(port, () => {
	console.log('---===============', `BackEnd is running on port ${port}.`, '==========---')
})
DataBase.conect()
