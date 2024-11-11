const mongoose = require('mongoose')
const { dbPassword } = require('./config')


let retryCount = 0
let connecting = false
const connectionString = `mongodb+srv://i4nizer:${dbPassword}@cluster-project.hnbf8.mongodb.net/eyedroponics?retryWrites=true&w=majority&appName=Cluster-Project&tls=true`

const connectDatabase = async () => {
    retryCount++

    try {
        await mongoose.connect(connectionString)
        console.log(`Database connected successfully after ${retryCount} attempts`)
        retryCount = 0
    } 
    catch (err) {
        console.error(`Database connection failed (${retryCount} attempts). Retrying in 5 seconds...`, err)
    }
    finally {
        connecting = false
    }
}

const onDisconnected = () => {    
    if (connecting) return
    connecting = true
    setTimeout(connectDatabase, 5000)
}

mongoose.connection.on('disconnected', onDisconnected)
mongoose.connection.on('error', (error) => console.error(`${error}`))


module.exports = { connectDatabase, connection: mongoose.connection }
