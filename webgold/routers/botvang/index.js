const router = require('express').Router()
const MbotVang = require('../../models/BotGold')
//bot vang
router.get('/thembot', (req, res) => {
    res.render('index', { page: "pages/botvang" })
})
router.post('/thembot', async (req, res) => {
    try {
        const { Username, Password, TypeBot, Server, Zone, ToaDoX, ToaDoY } = req.body
        await new MbotVang({ TypeBot: TypeBot, Username: Username, Password: Password, Server: Server, ToaDoX: ToaDoX, ToaDoY: ToaDoY, Zone: Zone }).save()
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
})
router.get('/bots', async (req, res) => {
    var bots = await MbotVang.find({})
    res.render('index', { page: "pages/bots", bots: bots })
})
router.post('/remove', async (req, res) => {
    try {
        const _id = req.body._id
        await MbotVang.findByIdAndRemove(_id)
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
})
router.post('/change', async (req, res) => {
    try {
        const { _id, Username, Password, Server, Zone, ToaDoX, ToaDoY, Type } = req.body
        await MbotVang.findByIdAndUpdate(_id, { Username: Username, Password: Password, Server: Server, ToaDoX: ToaDoX, ToaDoY: ToaDoY, Zone: Zone, TypeBot: Type })
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
})
module.exports = router