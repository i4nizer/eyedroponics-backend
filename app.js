const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)

const cors = require('cors')
const router = require('./routes/router')

const config = require('./config/config')
const stream = require('./services/stream')
const database = require('./config/database.config')


app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use('/api', router)

stream.attachToHttpServer(server)


server.listen(config.port, console.log(`Server running on http://localhost:${config.port}`))

database
    .connectDatabase()
    .then(() => console.log('Database Connected Successfully'))
    .catch((err) => console.error(err))