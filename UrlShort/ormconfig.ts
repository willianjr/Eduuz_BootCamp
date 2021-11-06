import './src/config/index'

// const config: ConnectionOptions = {
export default {
	type: 'sqlite',
	database: process.env.DB_DATABASE || 'src/database/database.sqlite',
	synchronize: false,
	logging: false,
	entities: ['src/api/models/**/*.ts'],
	migrations: ['src/database/migrations/**/*.ts'],
	cli: {
		migrationsDir: 'src/database/migrations',
		entitiesDir: './src/api/models',
	},
}
