import dotenv from 'dotenv'
import Server from './server'

dotenv.config()

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

const server = new Server()
server.start(port)
