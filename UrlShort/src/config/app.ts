import express from 'express'
import cors from 'cors'
// verificar cors options na documentacao
import queryParser from 'express-query-int'

import routes from './routes'

class App {
	public express: express.Application

	public constructor() {
		this.express = express()
		this.middlewares()
		this.routes()
	}

	private middlewares(): void {
		this.express.use(express.json())
		this.express.use(express.urlencoded({ extended: true }))
		this.express.use(cors())
		this.express.use(queryParser())
	}

	private routes(): void {
		this.express.use((req, res, next) => {
			const ENV = process.env.NODE_ENV || ''
			if (ENV.trim() !== 'test') {
				console.log('[[[ ROUTER  :::: - - >')

				console.log(' ', req.method, req.url, '@')
				console.log('         Initi ->', new Date())
				res.on('finish', () => {
					console.log('          Finish ->', new Date(), '< - - ::::   ]]]')
				})
			}
			next()
		})
		this.express.get('/', (req, res) => {
			return res.status(404).send('Use /Api')
		})
		this.express.use('/', routes)
	}
}

export default new App().express
