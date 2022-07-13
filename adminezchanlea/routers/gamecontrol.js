const router = require('express').Router()
const Clan = require('../models/Clan')
const User = require('../models/User')
const Cuoc = require('../models/Cuoc')
const Napvang = require('../models/Napvang')
const Usercontrol = require('../controller/userControl')
var CronJob = require('cron').CronJob;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var cronNewDay = new CronJob('00 00 00 * * *', function () {
    console.log("Hello new day~")
    newDayTraogiao()

}, function () {
    /* This function is executed when the job stops */
},
    true, /* Start the job right now */
    'Asia/Ho_Chi_Minh' /* Time zone of this job. */
);

async function newDayTraogiao() {
    try {
        const topclans = await Clan.find({}).sort({ thanhtich: -1 }).limit(7)
        const checkUserClan = await User.find({ "clan": { "$ne": 0 } })
        var index = 1;
        var sovanggggg = 0;
        for (let i = 0; i < topclans.length; i++) {
            var item = topclans[i]

            const checkusClan = await User.find({ 'clan.id': item._id.toString() })
            var giaithuong = 0;
            if (index == 1) giaithuong = 500000000
            else if (index == 2) giaithuong = 250000000
            else if (index == 3) giaithuong = 100000000
            else if (index == 4) giaithuong = 75000000
            else if (index == 5) giaithuong = 50000000
            else if (index == 6) giaithuong = 40000000
            else if (index == 7) giaithuong = 30000000

            for (let iz = 0; iz < checkusClan.length; iz++) {
                var item = checkusClan[iz]
                const cuocss = await Cuoc.countDocuments({ uid: item._id });
                const napvangs = await Napvang.countDocuments({ uid: item._id });
                //    if (cuocss && cuocss > 9 && napvangs && napvangs > 1 || item.topup > 0) {
                sovanggggg = sovanggggg + giaithuong
                const cccccc = await Usercontrol.upMoney(item._id, giaithuong)

                try {
                    const us = await User.findByIdAndUpdate(item._id, { "clan.thanhtichngay": 0 })
                } catch { }

                const sd = await Usercontrol.sodu(item._id, "+" + numberWithCommas(giaithuong), "Thưởng top " + index + " bang hội")
                //   }
            }
            await Clan.findByIdAndUpdate(item._id, { thanhtich: 0 })
            index++
        }
        const cc = await Clan.updateMany({}, { thanhtich: 0 })
        console.log("đã trao giải bang hội tổng: " + sovanggggg)
    }
    catch {

    }
    try {
        const topUser = await User.find({}).sort({ thanhtichngay: -1 }).limit(200)

        var indexTop = 1;
        for (let i = 0; i < topUser.length; i++) {
            var giaithuong = topUser[i].hanmuc * 0.03
            // if (indexTop == 1) { giaithuong = 5000000000 }
            // else if (indexTop == 2) { giaithuong = 2000000000 }
            // else if (indexTop == 3) { giaithuong = 1000000000 }
            // else if (indexTop == 4) { giaithuong = 500000000 }
            // else if (indexTop == 5) { giaithuong = 200000000 }
            // else if (indexTop == 6) { giaithuong = 100000000 }
            // else if (indexTop == 7) { giaithuong = 50000000 }

            const cccccc = await Usercontrol.upMoney(topUser[i]._id, giaithuong)
            const sd = await Usercontrol.sodu(topUser[i]._id, "+" + numberWithCommas(giaithuong), "Thưởng top " + indexTop + " BXH")
            await User.findByIdAndUpdate(topUser[i]._id, { thanhtichngay: 0 })
            console.log(indexTop + "|" + giaithuong)
            indexTop++

        }
        const ccc = await User.updateMany({}, { thanhtichngay: 0, hanmuc: 0 })


        console.log("đã trao giải xongg")
    } catch (error) {

    }
}

router.get('/rstop', async (req, res) => {
    const ccc = await User.updateMany({}, { thanhtichngay: 0 })
    const cc = await Clan.updateMany({}, { thanhtich: 0 })
    res.send("thanhcong")
})
router.post('/', async (req, res) => {
    const type = req.body.type
    newDayTraogiao()
    if (type == "banghoi") {
        //newDayTraogiao()
    }
    else if (type == "top") {
        //newDayTraogiao()
    }
})

router.get('/', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/')
    }

    res.render('index', { page: "gamecontrol", data: req.user })

})
module.exports = router
