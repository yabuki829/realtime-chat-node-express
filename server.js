const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);
const io = require("socket.io")(server);


app.get("/",(req,res) =>{
  res.sendFile(__dirname +"/index.html")
})

io.on("connection",(socket) => {
  console.log("ユーザーが接続しました")

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("chat message",(message) =>{
    console.log("メッセージを受け取りました。")
    io.emit("chat message",message)
  })
})

const PORT = 3000
server.listen(PORT,()=>{
  console.log("listen on 3000")
})

