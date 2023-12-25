const express = require('express')
const path = require('path');
const http=require('http')
const { Server } = require('socket.io')
const cors = require('cors')

//创建服务器
const app = express();
const httpServer = http.createServer(app);
const io=new Server(httpServer,{
  cors: {
    origin: 'http://127.0.0.1',
    methods: ['GET', 'POST']
  }
})

//配置cors,应对跨域
app.use(cors())

//添加api
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname,"html","index.html"));
});

io.on('connection', function (socket) {
    socket.on('message', function (data) {
        console.log('服务端收到: ', data);
        socket.send('你好客户端, ' + data);
    });

    socket.on('error', function (err) {
        console.log(err);
    });
});

//启动服务器
httpServer.listen(80, () => {
    console.log(`服务器启动于80端口`)
})