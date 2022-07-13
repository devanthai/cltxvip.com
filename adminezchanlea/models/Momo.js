const mongoose = require('mongoose');

const Tsrr = new mongoose.Schema({
    magd:{
        type:String
    },
    name:{
        type:String
    },
    sdt:{
        type:String
    },
    sotien:{
        type:Number
    },
    thucnhan:{
        type:Number
    },
    status:{
        type:String
    },
    timemomo:{
        type:String
    },
    uid:{
        type:Object
    },
    time:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Momo',Tsrr)