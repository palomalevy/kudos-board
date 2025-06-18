const express = require('express')
const cors = require('cors')
const Board = require('./boards')
const helmet = require('helmet')

const server = express()
server.use(helmet())
server.use(express.json())
server.use(cors())

const PORT = process.env.PORT || 3000