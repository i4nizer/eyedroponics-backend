const express = require('express')
const app = express()

const cors = require('cors')
const router = require('./routes/router')
const config = require('./config/config')
const { connectDatabase } = require('./config/database.config')


app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use('/api', router)


const runServerMsg = `Server running on http://localhost:${config.port}`

connectDatabase()
    .then(() => app.listen(config.port, console.log(runServerMsg)))
    .catch((err) => console.log(err))