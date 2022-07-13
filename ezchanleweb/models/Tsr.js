const mongoose = require('mongoose');

const Tsrr = new mongoose.Schema({
    magd:{
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
    timetsr:{
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
module.exports = mongoose.model('Tsr',Tsrr)