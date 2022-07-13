const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => console.log('Connected to db'));
const fs = require('fs');
const User = require("./models/User")
fs.readFile('users.txt', async function (err, data) {
    if (err) { console.log("loi") }
    const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
    for (let i = 0; i < arr.length; i++) {
        const crop = arr[i].split('|')
        const username = crop[0]
        const password = crop[1]
        const vang = crop[2]
        const kimcuong = crop[3]
        const server = crop[4]
        if (server) {
            console.log(username + "|" + server)
            await new User({ username: username, password: "null", server: server, vang: vang, kimcuong: kimcuong }).save()
        }
    }
})