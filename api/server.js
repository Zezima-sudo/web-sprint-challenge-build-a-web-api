const express = require('express')
const server = express()
const projectRouter = require('../routes/router')
const actionRouter = require('../routes/actionsRouter')

server.use(express.json())
server.use('/api', projectRouter)
server.use('/api/action', actionRouter)



module.exports = server