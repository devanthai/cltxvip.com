const router = require('express').Router()
const User = require('../models/User')
const Chat = require('../models/Chat')
const Clan = require('../models/Clan')
const checklogin = require('../Middleware/checklogin');
var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
function ranString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
    return Math.floor(seconds)
}
router.post('/', checklogin, async (req, res) => {
    const noidung = req.body.noidung;
    const server = req.body.server;
    var type = req.body.type;
    // type=1;
    if (req.session.time) {
        if (timeSince(req.session.time) < 5) {
            return res.send({ error: 1, message: "Vui lòng chat chậm hơn 1 chút!" })
        }
    }
    req.session.time = Date.now()

    var namespam = ['nro.club', 'nroclub', 'nroc', 'nrocltx', 'thucthuc', 'nrotx', 'nrochanle', 'cbrchanle', 'chanle', 'club', 'c lub', '.com', 'b i p', 'bị p', 'bjp', 'bip', 'bịp', 'b ịp', 'nrocl', 'nrcl', 'rocl', 'vanmay', 'van may', '.me', 'ocltx', 'oclt', 'tx. com']
    var namecheck = noidung.toLowerCase()
    var namechek2 = namecheck.replace(/\s/g, '')

    for (let i = 0; i < namespam.length; i++) {
        if (namechek2.includes(namespam[i])) {
            return res.send({ error: 1, message: "Bạn đang spam!" })
        }
    }
    if (req.user.vang == "0") {
        return res.send({ error: 1, message: "Cần 1tr vàng để chat" });
    }
    if (type != 1 && type != 0) {
        return res.send({ error: 1, message: "khl" });
    }
    if (server != 1 && server != 2 && server != 3 && server != 4 && server != 5 && server != 6 && server != 7 && server != 8 && server != 9 && server != 10) {
        return res.send({ error: 1, message: "Server không hợp lệ" });
    }
    if (!req.user.isLogin) {
        return res.send({ error: 1, message: "Vui lòng đăng nhập" });
    }
    else if (noidung.length < 2 || noidung.length > 200) {
        return res.send({ error: 1, message: "Nội dung phải lớn hơn 2 và nhỏ hơn 200 ký tự" });
    }
    else if (isHTML(noidung)) {
        return res.send({ error: 1, message: "Không hợp lệ" });
    }
    else {
        const token = ranString(5);
        var typeclan = 0;
        if (req.user.clan != 0) {
            const gettypeclan = await Clan.findById(req.user.clan.id)
            if (gettypeclan) {
                typeclan = gettypeclan.type;
            }
        }
        const getTop = await User.find({}).sort({ thanhtichngay: -1 }).limit(7)
        var index = getTop.findIndex(p => p._id.toString() === req.user._id.toString());
        var vipp = 0;
        if (req.user.topup >= 100000) {
            vipp = 1;
        }
        if (req.user.topup >= 500000) {
            vipp = 2;
        }
        if (req.user.topup >= 2000000) {
            vipp = 3;
        }
        if (req.user.topup >= 5000000) {
            vipp = 4;
        }
        if (req.user.topup >= 10000000) {
            vipp = 5;
        }
        if (req.user.topup >= 20000000) {
            vipp = 6;
        }

        try {

            return res.send({ error: 0, vip: vipp, top: index + 1, clan: typeclan, message: "Chat", server: server, name: req.user.name, noidung: noidung, sodu: req.user.vang, type: type, token: token, avatar: req.user.avatar })
        }
        catch (err) { res.status(200).send({ error: 1, message: "Lỗi không xác định vui lòng thử lại" }) }
    }

});
router.get('/', (req, res) => { res.send("á đù víp") })
module.exports = router