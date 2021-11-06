import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const envconfig = process.env.NODE_ENV ? `.${process.env.NODE_ENV.trim()}` : ''
const urlEnv = process.cwd() + path.join(`/.env${envconfig}`)

const envConfig = dotenv.parse(fs.readFileSync(urlEnv))
for (const k in envConfig) {
	process.env[k] = envConfig[k]
}
