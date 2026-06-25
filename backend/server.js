require('dotenv').config()
const app = require('./src/app')
const {createServer} = require('http')
const {Server, Socket} = require('socket.io')
const generateResponse = require('./src/service/ai.service')
const { text } = require('stream/consumers')

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

const chatHistory = []

io.on('connection', (Socket)=>{
    console.log('user connected')

    Socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })

    Socket.on('ai-message', async(data)=> {
        console.log('recieved ai msg: ', data)

        chatHistory.push({
            role: 'user',
            parts: [{text:data}],
        })
        console.log(chatHistory)
        // ai response
        // const response = await generateResponse(data)
        const response = await generateResponse(chatHistory)

        chatHistory.push({
            role: 'model',
            parts: [{text:response}],
        })

        Socket.emit('ai-message-response', {response})
    })

})

httpServer.listen(3000, ()=>{
    console.log('server is running on port 3000')
})