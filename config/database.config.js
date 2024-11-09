const mongoose = require('mongoose')
const { dbPassword } = require('./config')


let retryCount = 0
const connectionString = `mongodb+srv://i4nizer:${dbPassword}@cluster-project.hnbf8.mongodb.net/eyedroponics?retryWrites=true&w=majority&appName=Cluster-Project`

const connectDatabase = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log(`Database connected successfully after ${retryCount+1} attempts`)
        retryCount = 0

    } catch (err) {
        
        retryCount++
        console.error(`Database connection failed (${retryCount+1} attempts). Retrying in 5 seconds...`, err)
    }
}

mongoose.connection.on('disconnected', () => setTimeout(connectDatabase, 5000))
mongoose.connection.on('error', (error) => console.error(`${error}`))


module.exports = { connectDatabase, connection: mongoose.connection }
