const express = require('express');
const app = express()
const WebSocket = require('ws');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
var session = require('express-session')
const routers = require('./routers');
const Game = require('./controller/game');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  resave: true,
    saveUninitialized: true,
    secret: 'admin9saoosdssss',
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true,useFindAndModify: false },()=>console.log('Connected to db'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set("view engine","ejs")
app.set("views","./views")
routers(app)
Game.GameStart();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });
server.listen(2005,()=>console.log('Server Running on port 2005'));
