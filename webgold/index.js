const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var Router = require('./routers')
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'));

var session = require('express-session')


const app = express()
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'admin9saoosdssss',
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(bodyParser.json({ limit: '30mb' }))
app.use(express.static('public'))
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(Router)
const server = require('http').createServer(app);
server.listen(3001, () => console.log('Server Running on port 3001'));