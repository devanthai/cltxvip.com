const mongoose = require('mongoose');

const botnap = new mongoose.Schema({
    map:{
        type:String
    },
    server:{
        type:Number
    },
    khu:{
        type:Number
    },
    tnv:{
        type:String
    },
    sothoi:{
        type:Number
    },
    taikhoan:{
        type:String
    }
})
module.exports = mongoose.model('Botthoi',botnap)