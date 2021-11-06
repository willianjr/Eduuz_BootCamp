import { getConnection } from 'typeorm'
import request = require('supertest')
import Database from '../../src/database'
import app from '../../src/config/app'
import { URLModel } from '../../src/api/models/urlModel'
import shortid from 'shortid'

describe.skip('URLModel: Repositories in Banco de Dados', () => {
	beforeAll(async () => {
		await Database.conect()
	})
	afterAll(async () => {
		await Database.close()
	})
	beforeEach(async () => {
		await Database.truncate()
	})
	// Testes de Repositórios
	// CREATE
	test('Não deve inserir uma nova url se ela não tiver campos obrigatórios', async () => {
		const urlRepository = getConnection().getRepository(URLModel)
		const url = await urlRepository.create({
			originURL: 'url Mais 30',
		})
		await expect(urlRepository.save(url)).rejects.toThrow()
	})
	test('Deve inserir um novo url', async () => {
		const urlRepository = getConnection().getRepository(URLModel)
		const hash = shortid.generate()
		const url = await urlRepository.create({
			originURL:
				'https://web.dio.me/lab/construindo-encurtador-de-url/learning/f320cebb-96ba-472a-a460-c0db2579fd54',
			shortURL: `http:localhost:3031/${hash}`,
			hash: hash,
		})
		const results = await urlRepository.save(url)
		expect(url.originURL).toBe(results.originURL)
	})
	//FIND

	test('Não deve receber um url com id inválido', async () => {
		const id = '15sd4f'
		const urlRepository = getConnection().getRepository(URLModel)
		const results = await urlRepository.find({
			where: {
				_id: id,
			},
		})

		expect(results).toHaveLength(0)
	})
	test('Deve obter um url com id', async () => {
		const urlRepository = getConnection().getRepository(URLModel)
		const hash = shortid.generate()
		const url = await urlRepository.create({
			originURL:
				'https://web.dio.me/lab/construindo-encurtador-de-url/learning/f320cebb-96ba-472a-a460-c0db2579fd54',
			shortURL: `http:localhost:3031/${hash}`,
			hash: hash,
		})
		const resultsSave = await urlRepository.save(url)

		const id = resultsSave._id

		const results = await urlRepository.find({
			where: {
				_id: id,
			},
		})

		expect(results).toHaveLength(1)
	})

	//REMOVE

	test('Não deve remover um url com id inválido ou nulo', async () => {
		const id = '15sd4f'
		const urlRepository = getConnection().getRepository(URLModel)
		const [, countBefore] = await urlRepository.findAndCount({ where: { _id: id } })
		const results = await urlRepository.delete(id)

		expect(countBefore).toBe(0)
	})
	test('Deve remover um url com id válido', async () => {
		const urlRepository = getConnection().getRepository(URLModel)
		const hash = shortid.generate()
		const url = await urlRepository.create({
			originURL:
				'https://web.dio.me/lab/construindo-encurtador-de-url/learning/f320cebb-96ba-472a-a460-c0db2579fd54',
			shortURL: `http:localhost:3031/${hash}`,
			hash: hash,
		})
		const resultsSave = await urlRepository.save(url)

		const id = resultsSave._id
		const [, countBefore] = await urlRepository.findAndCount({ where: { _id: id } })
		const results = await urlRepository.delete(id)
		const [, countAfter] = await urlRepository.findAndCount({ where: { _id: id } })

		expect(countBefore).toBe(1)
		expect(countAfter).toBe(0)
	})
})
