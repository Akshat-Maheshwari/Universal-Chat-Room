const express = require('express');
const path=require('path');


const app = express();
const PORT = 3000 || process.env.PORT;

//Listening
const server = app.listen(PORT , ()=>{
  console.log(`Server running on ${PORT}`)
})
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,"\public")));

const totalUsers = new Set();

//Event Handeling
const connected = (socket)=>{
  totalUsers.add(socket.id);
  io.emit('totalUsers', totalUsers.size);

  socket.on("disconnect",()=>{
    console.log("User disconnected: "+ socket.id);
    totalUsers.delete(socket.id);
    io.emit('totalUsers', totalUsers.size);
  })

  socket.on("messageData",(data)=>{
    socket.broadcast.emit("othersMessage",data);
  })
}

io.on("connection", connected);
