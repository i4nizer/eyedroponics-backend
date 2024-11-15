const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
// const deviceModel = require('../models/device.model')


// Create Instance
const io = new Server({ cors: { origin: 'http://localhost:3000', credentials: true }})

// Store Socket IDs
const socketIDs = {}


// Middleware to validate the API key
io.use(async (socket, next) => {
    try {
        // Access
        const apiKey = socket.handshake.auth.apiKey

        // Verify { userId, projectId, deviceId }
        const payload = jwt.verify(apiKey, config.apiKey)

        // (Optional for Performance) Confirm From Database
        // const device = await deviceModel.findOne({ key: apiKey })
        // if (!device) return next(new Error('Authentication error: Invalid API Key'))
        
        // Only allow specific user to access the stream
        const streamId = `${payload.userId}${payload.projectId}${payload.deviceId}`
        socket.streamId = streamId
        
        // Store socketID for targeted room streaming
        socketIDs[streamId] = socket.id
    
        // Notify
        console.log(`Device ${device.name} of user ${payload.userId} connected successfully.`)
        console.log(`Stream ID: ${streamId}`)
        
        next()
    
    } catch (error) { next(new Error(error.toString())) }
})


// Events
io.on('connection', (socket) => {
    
    socket.to('').emit()

    // Broadcast Received Frame to Specific Room
    socket.on(`video-frame`, (frame) => {

        // Get user's device socket
        const socketId = socketIDs[socket.streamId]

        if (socketId) {

            // Stream to user's device socket
            io.to(socketId).emit('stream', frame)
            console.log(`Now streaming for ${socket.streamId}`)
        }
        else console.log(`No socket for stream ID ${socket.streamId}`)
    })
    
    // Notif Disconnection
    socket.on('disconnect', () => console.log(`Stream stopped for stream ID ${socket.streamId}`))
})


// Export the `io` instance and an `attach` function
module.exports = { io, socketIDs, attachToHttpServer: (httpServer) => io.attach(httpServer), }