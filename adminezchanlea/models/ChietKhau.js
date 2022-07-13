const mongoose = require('mongoose');

const ChietKhauSchema = new mongoose.Schema({
    server:{
        type:Number
    },
    vi:{
        type:Number
    },
    card:{
        type:Number
    }
})
module.exports = mongoose.model('ChietKhau',ChietKhauSchema)
//dang viet code