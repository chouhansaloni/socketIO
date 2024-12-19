import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();//express instance
const server = http.createServer(app);//instance wrap in http server
const io = new Server(server); //socket io ko server ke sath integrate kiya he

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/router1', (req, res) => {
  res.render('router1');
});

app.get('/router2', (req, res) => {
  res.render('router2');
});

io.on('connection', (socket) => {//Jab koi user Socket.IO server se connect hota hai, toh connection event trigger hota hai. Isme socket.id ke through user ka unique identifier milta hai.
    console.log('A user connected:', socket.id);

    // Listening for messages from any router and emitting it to all clients
    socket.on('message', (data) => {//jaise hi msg aata he ye trigger karta he 
      console.log(`Received message from ${data.sender}: ${data.message}`);  
      io.emit('message', data); // sabko dhikh jayga jo bhi connected he
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
});

server.listen(3000, () => {
  console.log('Server is running');
});
