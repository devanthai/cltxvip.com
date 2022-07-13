const login = require('./login')
const checklogin = require('./checklogin')
const setting = require('./setting')
const game = require('../controller/game')
const thanhvien = require('./thanhvien')
const napvang = require('./napvang')
const rutvang = require('./rutvang')
const napthoi = require('./napthoi')
const hisadmin = require('./hisadmin')
const chietkhau = require('./chietkhau')
const idnaprut = require('./idnaprut')
const gamecontrol = require('./gamecontrol')
const homnay = require('./homnay')
const thangnay = require('./thangnay')
const page = require('./page')
const bot = require('./bot')
const momo = require('./momo')
const tsr = require('./tsr')
const User = require('../models/User')
const Momo = require('../models/Momo')
const Card = require('../models/Card')
const Vongquay = require('../models/Vongquay')
const Tsr = require('../models/Tsr')
const Chat = require('../models/Chat')
const Game = require('../models/Game')
const Clan = require('../models/Clan')
const Chatclan = require('../models/Chatclan')
const Cuoc = require('../models/Cuoc')
const Sodu = require('../models/Sodu')
const Napvang = require('../models/Napvang')
const Rutvang = require('../models/Rutvang')
const Nohu = require('../models/nohu/Nohu')

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function route(app) {
    app.use(checklogin)
    app.use('/login', login)
    app.use('/thanhvien', thanhvien)
    app.use('/napvang', napvang)
    app.use('/rutvang', rutvang)
    app.use('/napthoi', napthoi)
    app.use('/hisadmin', hisadmin)
    app.use('/page', page)
    app.use('/bot', bot)
    app.use('/setting', setting)
    app.use('/chietkhau', chietkhau)
    app.use('/idnaprut', idnaprut)
    app.use('/gamecontrol', gamecontrol)
    app.use('/homnay', homnay)
    app.use('/thangnay', thangnay)
    app.use('/momo', momo)
    app.use('/tsr', tsr)

    app.get('/removegame', async (req, res) => {
    //     await User.deleteMany({})

    //     const cc = await Cuoc.remove({ status: { $ne: -1 } })
    //     await Chatclan.deleteMany({})
    //     await Game.deleteMany({})
    //     await Sodu.deleteMany({})
    //     await Napvang.deleteMany({})
    //     await Rutvang.deleteMany({})
    //    await Chat.deleteMany({})
    //      await Clan.deleteMany({})
    //      await Nohu.deleteMany({})
    //      await Momo.deleteMany({})
    //      await Tsr.deleteMany({})
    //      await Vongquay.deleteMany({})
    //      await Card.deleteMany({})



        res.send("ok")
    })

    app.get('/xoachat', async (req, res) => {
        // await User.updateMany({},{kimcuong:2})
        // await User.updateMany({},{vang:2000000})
        // await Cuoc.deleteMany({})
        // await Game.deleteMany({})
        // await Sodu.deleteMany({})
        // await Napvang.deleteMany({})
        // await Rutvang.deleteMany({})
        await Chat.deleteMany({})



        res.send("ok")
    })
    app.get('/', async function (req, res) {
        if (!req.user.isLogin) {
            return res.redirect('/login')
        }
        var card = await game.sumCard();
        var card2 = { tong: 0, tongreal: 0 };
        if (card) {
            card2 = { tong: numberWithCommas(card.tongcard), tongreal: numberWithCommas(card.tongreal) }
        }

        var cardthang = await game.sumCardThang();
        var card2thang = { tong: 0, tongreal: 0 };
        if (cardthang) {
            card2thang = { tong: numberWithCommas(cardthang.tongcard), tongreal: numberWithCommas(cardthang.tongreal) }
        }
        var tsrthang = await game.sumTsrThang();
        var sotientsrthang = 0;
        if (tsrthang) {
            sotientsrthang = numberWithCommas(tsrthang.sotien)
        }


        var tsr = await game.sumTsr();
        var sotientsr = 0;
        if (tsr) {
            sotientsr = numberWithCommas(tsr.sotien)
        }




        var momothang = await game.sumMomoThang();
        var sotienmomothang = 0;
        if (momothang) {
            sotienmomothang = numberWithCommas(momothang.sotien)
        }


        var momo = await game.sumMomo();
        var sotienmomo = 0;
        if (momo) {
            sotienmomo = numberWithCommas(momo.sotien)
        }


        var tienthangmm = await game.sumThangmm();
        var thangclmm = 0;
        if (tienthangmm) {
            thangclmm = (tienthangmm.tienthang)
        }
        //console.log(tienthangmm)

        var tienthuamm = await game.sumThuamm();
        var thuaclmm = 0;
        if (tienthuamm) {
            thuaclmm = (tienthuamm.tiencuoc)
        }
        //console.log(tienthuamm)





        var tienthangtsr = await game.sumthangtsrclmm();
        var thangtsr = 0;
        if (tienthangtsr) {
            thangtsr = Math.round(tienthangtsr.tienthang)
        }
        console.log(tienthangtsr)

        var tienthuatsr = await game.sumTsrclmm();
        var thuatsr = 0;
        if (tienthuatsr) {
            thuatsr = Math.round(tienthuatsr.tiencuoc)
        }
        console.log(tienthuatsr)


        res.render('index', { page: "trangchu", data: req.user, usernow: await game.getcountusers(), card: card2, tsr: sotientsr, cardthang: card2thang, tsrthang: sotientsrthang, momo: sotienmomo, momothang: sotienmomothang, clmm: numberWithCommas(thuaclmm - thangclmm), tsrmm: numberWithCommas(thuatsr - thangtsr) });
    })
}
module.exports = route