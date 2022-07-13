const router = require('express').Router()
const moment = require('moment')

const game = require('../controller/game')
const Napvang = require('../models/Napvang')
const Rutvang = require('../models/Rutvang')

 async function sumnap(server) {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
    const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
    const sum = await Napvang.aggregate([{
        $match: { time: { $gte: new Date(startOfMonth), $lt: new Date(endOfMonth) },server:server,status:1 },
    }, {
        $group: {
            _id: null,
            vang: {
                $sum: "$sovang"
            },

        }
    }])
    return sum[0]
}

async function sumrut(server) {

    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
    const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
    
    const sum = await Rutvang.aggregate([{
        $match: { time: { $gte: new Date(startOfMonth), $lt: new Date(endOfMonth) },server:server,status:1 },
    }, {
        $group: {
            _id: null,
            vang: {
                $sum: "$sovang"
            },

        }
    }])
    return sum[0]
}
router.get('/', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/')
    }
   // var cccc = await game.sumCardThang()
    var nsv1=0;
    var nsv2=0;
    var nsv3=0;
    var nsv4=0;
    var nsv5=0;
    var nsv6=0;
    var nsv7=0;
    var nsv8=0;
    var nsv9=0;

    var rsv1=0;
    var rsv2=0;
    var rsv3=0;
    var rsv4=0;
    var rsv5=0;
    var rsv6=0;
    var rsv7=0;
    var rsv8=0;
    var rsv9=0;
    const sv1 = await sumnap(1);if(sv1){nsv1=sv1.vang}
    const sv2 = await sumnap(2);if(sv2){nsv2=sv2.vang}
    const sv3 = await sumnap(3);if(sv3){nsv3=sv3.vang}
    const sv4 = await sumnap(4);if(sv4){nsv4=sv4.vang}
    const sv5 = await sumnap(5);if(sv5){nsv5=sv5.vang}
    const sv6 = await sumnap(6);if(sv6){nsv6=sv6.vang}
    const sv7 = await sumnap(7);if(sv7){nsv7=sv7.vang}
    const sv8 = await sumnap(8);if(sv8){nsv8=sv8.vang}
    const sv9 = await sumnap(9);if(sv9){nsv9=sv9.vang}

    const rutsv1 = await sumrut(1);if(rutsv1){rsv1=rutsv1.vang}
    const rutsv2 = await sumrut(2);if(rutsv2){rsv2=rutsv2.vang}
    const rutsv3 = await sumrut(3);if(rutsv3){rsv3=rutsv3.vang}
    const rutsv4 = await sumrut(4);if(rutsv4){rsv4=rutsv4.vang}
    const rutsv5 = await sumrut(5);if(rutsv5){rsv5=rutsv5.vang}
    const rutsv6 = await sumrut(6);if(rutsv6){rsv6=rutsv6.vang}
    const rutsv7 = await sumrut(7);if(rutsv7){rsv7=rutsv7.vang}
    const rutsv8 = await sumrut(8);if(rutsv8){rsv8=rutsv8.vang}
    const rutsv9 = await sumrut(9);if(rutsv9){rsv9=rutsv9.vang}
    
    const ccc = {napsv1:nsv1,napsv2:nsv2,napsv3:nsv3,napsv4:nsv4,napsv5:nsv5,napsv6:nsv6,napsv7:nsv7,napsv8:nsv8,napsv9:nsv9,
        rutsv1:rsv1,rutsv2:rsv2,rutsv3:rsv3,rutsv4:rsv4,rutsv5:rsv5,rutsv6:rsv6,rutsv7:rsv7,rutsv8:rsv8,rutsv9:rsv9}
    res.render('index',{page:"thangnay",data:req.user,data:ccc })

})
module.exports = router
