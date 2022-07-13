const router = require('express').Router()
const Setting = require('../models/Setting')

router.post('/upsetting', async (req, res) => {

    res.send("thanh cong")

})

router.post('/', async (req, res) => {


    var cltx = req.body.cltx
    var xien = req.body.xien
    var kimcuong = req.body.kimcuong
    var dudoankq = req.body.dudoankq

    var sdtmomo = req.body.sdtmomo
    var namemomo = req.body.namemomo

    const setting = await Setting.findOneAndUpdate({ setting: "setting" }, {
        thongbao: req.body.thongbao,
        cuoitrang: req.body.cuoitrang,
        'tile.cltx': cltx,
        'tile.xien': xien,
        'tile.kimcuong': kimcuong,
        'tile.dudoankq': dudoankq,
        'naptien.momo.sdt': sdtmomo,
        'naptien.momo.name': namemomo
    })
    if (setting) {
        res.send("thanh cong")
    }
    else {
        await new Setting({ setting: "setting", thongbao: req.body.thongbao, cuoitrang: req.body.cuoitrang }).save()
        res.send("that bai")
    }
})
router.get('/', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/')
    }
    const setting = await Setting.findOne({ setting: "setting" })



    res.render('index', { page: "page", data: req.user, setting: setting })

})
module.exports = router
