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

    Socket.on('ai-message', async(data)=> {
        console.log('recieved ai msg: ', data)

        chatHistory.push({
            role: 'user',
            parts: [{text:data}],
        })
        console.log(chatHistory)

        try {   
            const response = await generateResponse(chatHistory)
    
            chatHistory.push({
                role: 'model',
                parts: [{text:response}],
            })
    
            Socket.emit('ai-message-response', {response})
        } catch (error) {
            console.log("error: ",error);

            // remove the failed user message from history
            chatHistory.pop()

            let message = "Sorry, I'm having trouble responding right now. Please try again in a moment."

            if(error.status === 503){
                message = "The AI service is currently experiencing high demand. Please try again in a few moments."
            }
            Socket.emit('ai-message-response', {
                response: message
            })
        }
    })

})

httpServer.listen(3000, ()=>{
    console.log('server is running on port 3000')
})