import '../../config/index'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import shortId from 'shortid'
import { validateOrReject } from 'class-validator'
import { URLModel } from '../models/urlModel'

class URLController {
	public async shorten(req: Request, response: Response): Promise<Response> {
		try {
			const { originURL } = req.body
			const urlRepository = await getConnection().getRepository(URLModel)
			const url = await urlRepository.findOne({ originURL })
			if (url) {
				response.json(url)
				return
			}

			const hash = shortId.generate()
			const shortURL = `${process.env.API_URL}/${hash}`
			const newURL = await urlRepository.create({ hash, shortURL, originURL })
			const results = await urlRepository.save(newURL)

			return response.status(201).json(newURL)
		} catch (error) {
			return response.status(400).json({ message: error.message })
		}
	}

	public async redirect(req: Request, response: Response): Promise<Response> {
		try {
			const { hash } = req.params
			const urlRepository = await getConnection().getRepository(URLModel)
			const url = await urlRepository.findOne({ hash })

			if (url) {
				//response.redirect(url.originURL)
				return response.status(200).send(url)
			}

			response.status(400).json({ error: 'URL not found' })
		} catch (error) {
			return response.status(400).json({ message: error.message })
		}
	}
}

export default new URLController()
