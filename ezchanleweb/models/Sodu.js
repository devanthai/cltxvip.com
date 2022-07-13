const mongoose = require('mongoose');

const Sodu = new mongoose.Schema({
    noidung:{
        type:String
    },
    giaodich:{
        type:String
    },
    uid:{
        type:Object
    },
    vang:{
        type:Number
    }, time:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Sodu',Sodu)