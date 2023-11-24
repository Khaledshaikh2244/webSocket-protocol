const WebSocket = require('ws')
const http = require('http')
const express = require('express')

// Create an Express app
const app = express()

// Create an HTTP server using the Express app as a handler
const server = http.createServer(app)

// Create a WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server })

// Event handler for WebSocket connections
wss.on('connection', (ws) => {
  // Handle incoming messages from connected clients
  ws.on('message', (message) => {
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      // Send the message to clients other than the sender
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })
})

// Define a route to serve a basic HTML file for the chat client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Start the server and make it listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
