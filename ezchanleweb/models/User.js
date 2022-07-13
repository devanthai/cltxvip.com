const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    server: {
        type: Number,
        required: true
    },
    vang: {
        type: Number,
        default: 0//dayyyyyyyyyyyyyyyyyyyyyyyy
    },
    kimcuong: {
        type: Number,
        default: 0 //dayyyyyyyyyyyyyyyyyyyyyyyy
    },
    tenhienthi: {
        type: String,
        default: ""
    },
    admin: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: 0
    },
    clan: {
        type: Object,
        default: 0
    },
    thanhtichngay: {
        type: Number,
        default: 0
    },
    hanmuc: {
        type: Number,
        default: 0
    },
    topup: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
    ,
    avatar: {
        type: Number,
        default: 1
    },
    timetopup: {
        type: Date
    }
})
module.exports = mongoose.model('User', userSchema)