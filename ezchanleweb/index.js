const express = require('express');
const app = express()
const WebSocket = require('ws');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
const routers = require('./routers');
const Game = require('./controller/game');
const Keno = require('./controller/keno');
var session = require('express-session')
const Lucky = require('./game/diemdanh');

var cookieSession = require('cookie-session')
var Keygrip = require('keygrip')
var morgan = require('morgan')

//app.use(morgan('combined'))
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session2',
  keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64'),

  // Cookie Options
  maxAge: 2400 * 60 * 60 * 1000 // 24 hours
}))
dotenv.config()
 mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true },()=>console.log('Connected to db'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set("view engine","ejs")
app.set("views","./views")


const server = require('http').createServer(app);
const io = require('socket.io')(server);
Lucky.gamestart(io,app);
routers(app)



const wss = new WebSocket.Server({ server , path: '/wss' });

Game.webSocket(wss)
Game.server24(wss)
//Keno.KenoStart()
// io.on('connection', client => {
//     console.log(client.id)
//     client.on('event', data => { /* … */ });
//     client.on('disconnect', () => { /* … */ });
//   });
server.listen(8443,()=>console.log('Server Running on port 8443'));


