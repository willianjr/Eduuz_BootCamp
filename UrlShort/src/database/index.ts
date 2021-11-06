import { Connection, createConnection, getConnection } from 'typeorm'

class Database {
	public ENV = process.env.NODE_ENV || ''
	public async conect(): Promise<void> {
		await createConnection()
			.then(() => {
				// console.log('CONNECT:', process.env.DB_DATABASE)
			})
			.catch((error) => {
				console.log(error)
			})
		const { options } = getConnection()
		this.ENV.trim() !== 'test' &&
			console.log(
				`---=============== TYPEORM: Conected:${options.type} \n to DataBase: ${options.database}==========---`,
			)
	}

	public async close(): Promise<void> {
		return await getConnection()
			.close()
			.then(() => {
				this.ENV.trim() !== 'test' && console.log('---===============TYPEORM: Desconected ==========---')
			})
			.catch(() => {
				console.log('---=============== TYPEORM: Error ao Desconected ==========---')
			})
	}

	public async dropDataBase(): Promise<void> {
		return await getConnection()
			.dropDatabase()
			.then()
			.catch((error) => {
				console.log(error)
			})
	}

	public async truncate(): Promise<void> {
		const entities = getConnection().entityMetadatas

		for (const entity of entities) {
			const repository = await getConnection().getRepository(entity.name)
			// console.log(`TRUNCATE TABLE '${entity.tableName}';`)
			await repository.clear()
		}
	}

	public connected(): Connection {
		return getConnection()
	}
}

export default new Database()
