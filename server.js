const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express() // inicio de express 
const httpServer = new HttpServer(app) // inicio de servidor http
const io = new IOServer(httpServer) // io va a estar atento de todo lo que se recibe

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
});

httpServer.listen(8080, () => console.log('SERVER ON'))

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];

 io.on('connection',socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data); // se agrega el mensaje al array de mensajes
        io.sockets.emit('messages', messages); // manda los mensajes a todos los usuarios
    });
 });


