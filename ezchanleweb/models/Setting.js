const mongoose = require('mongoose');

const setting = new mongoose.Schema({
    setting:{
        type:String
    },
    thongbao:{
        type:String,
        default:"thongbao"
    },
    hanmuc: {
        server1: { type: Boolean, default: true },
        server2: { type: Boolean, default: true },
        server3: { type: Boolean, default: true },
        server4: { type: Boolean, default: true },
        server5: { type: Boolean, default: true },
        server6: { type: Boolean, default: true },
        server7: { type: Boolean, default: true },
        server8: { type: Boolean, default: true },
        server9: { type: Boolean, default: true }
    },
    cuoitrang:{
        type:String,
        default:"cuoitrang"
    },
    naptien: {
        momo: {
            sdt: { type: String, defauft: "0982250641" },
            name: { type: String, defauft: "Nguyễn Thị Thảo" }
        }
    },
    tile:{
        kimcuong:{type:Number,default:3333},
        cltx:{type:Number,default:1.95},
        xien:{type:Number,default:3.2},
        dudoankq:{type:Number,default:70}
    }
   
})
module.exports = mongoose.model('Setting',setting)