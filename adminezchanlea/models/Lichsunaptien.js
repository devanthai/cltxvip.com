const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    noidung:{
        type:String,
    },
   
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Lichsunaptien',userSchema)