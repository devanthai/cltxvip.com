const router = require('express').Router()
const UserControl = require('../../controller/user')
const userAuth = require('../../controller/userAuth');
const request = require('request');
const checklogin = require('../../Middleware/checklogin');
const napVang = require('../../controller/napvang');
const rutvang = require('../../controller/rutvang');
const clan = require('./clan');
const TheSieuRe = require('../../controller/tsr');
const User = require('../../models/User')
const Card = require('../../models/Card')
const Sodu = require('../../models/Sodu')
const Cuoc = require('../../models/Cuoc')
const Chuyentien = require('../../models/Chuyentien')
const Vongquay = require('../../models/Vongquay')
const Tsr = require('../../models/Tsr')
const Momo = require('../../models/Momo')
const ChietKhau = require('../../models/ChietKhau')
const Setting = require('../../models/Setting')
const Gifcode = require('../../models/Gifcode')
const bcrypt = require('bcryptjs')
const md5 = require('md5');
let Captcha = require('node-captcha-generator');
const moment = require('moment')

//  new ChietKhau({ server: 1, vi: 6000,card:5000 }).save()
//  new ChietKhau({ server: 2, vi: 6000,card:5000 }).save()
//  new ChietKhau({ server: 3, vi: 6000,card:5000 }).save()
//  new ChietKhau({ server: 4, vi: 6000,card:5000 }).save()
//  new ChietKhau({ server: 5, vi: 6000,card:5000 }).save()
//  new ChietKhau({ server: 6, vi: 6000,card:5000 }).save()
//  new ChietKhau({ server: 7, vi: 6000,card:5000 }).save()
//  new ChietKhau({ server: 8, vi: 6000,card:5000 }).save()
//  new ChietKhau({ server: 9, vi: 4000,card:3000 }).save()


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

router.use(userAuth)
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var listPage = {
    "": "Thông tin tài khoản",
    "napcard": "Nạp thẻ cào",
    "napmomo": "Nạp ví Momo",
    "naptsr": "Nạp từ ví TheSieuRe.Com",
    "sodu/1": "Lịch sử thay đổi số dư",
    "csmm/1": "Lịch sử con số may mắn",
    "chuyenvang": "Chuyển vàng cho người khác"
};

function menuAction(page) {
    var liMenu = "";
    for (var key in listPage) {

        if (key === page) {
            liMenu += '<li><i class="fas fa-square" style="color: #32c5d2; margin-right: 10px; font-size: 10px"></i> <a href="/user/' + key + '" style="color: #32c5d2">' + listPage[key] + '</a></li>';
        }
        else {
            liMenu += '<li><i class="fas fa-square" style="color: #32c5d2; margin-right: 10px; font-size: 10px"></i> <a href="/user/' + key + '" style="color: inherit">' + listPage[key] + '</a></li>';

        }
    }
    return liMenu
}
router.use(checklogin)
router.use(napVang)
router.use(rutvang)
router.use(clan)

router.get('/', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }

    res.render("index", { page: "pages/user/about", menu: menuAction(''), data: req.user })
})

router.get('/napcard', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }



    const chietkhau = await ChietKhau.findOne({ server: req.user.server })
    res.render("index", { page: "pages/user/napcard", menu: menuAction('napcard'), data: req.user, tile: chietkhau.card })
})
router.post('/napcard', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.json({ error: 1, message: "<strong>Thất bại! </strong>Vui lòng đăng nhập" });
    }
    else if (req.body.type) {
        const listCard = await Card.find({ uid: req.user._id })
        return res.send(listCard)
    }
    else {

        try {
            const telco = req.body.name;
            const declared = req.body.declared;
            const code = req.body.code;
            const serial = req.body.serial;
            const requestId = Math.floor(Math.random() * 100000000000);
            const partner_id = "7687160461";
            const partner_key = "ee81bcdac83895a968eaf2004bce09f3";
            var options = {
                'method': 'POST',
                'url': 'https://thesieure.com/chargingws/v2',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "telco": telco,
                    "code": code,
                    "serial": serial,
                    "amount": declared,
                    "request_id": requestId,
                    "partner_id": partner_id,
                    "command": "charging",
                    "sign": md5(partner_key + code + "charging" + partner_id + requestId + serial + telco)
                })
            };
            request(options, async function (error, response) {
                if (error) return res.json({ error: 1, message: "<strong>Thất bại! </strong>" + "Có lỗi đã xảy ra vui lòng thử lại" });
                const resJ = JSON.parse(response.body);
                if (resJ.status == 1) {
                    console.log(resJ)
                    const chietkhau = await ChietKhau.findOne({ server: req.user.server })
                    const setting = await Setting.findOne({ setting: "setting" })

                    if (chietkhau) {
                        const vangcong = (resJ.value * chietkhau.card) + getRandomIntInclusive(2000000, 10000000)
                        const addCard = new Card({
                            code: code,
                            serial: serial,
                            loaithe: telco,
                            menhgia: declared,
                            amount: resJ.amount,
                            status: 1,
                            message: resJ.message,
                            server: req.user.server,
                            requestid: requestId,
                            nhan: vangcong,
                            uid: req.user._id
                        })
                        try {
                            const savedCard = await addCard.save()
                            console.log(savedCard)
                            var table = '<tr><td style="white-space:nowrap;"><span class="badge badge-warning" style="padding: 5px">' + resJ.message + '</span></td> <td style="white-space:nowrap;">' + savedCard.time + '</td><td style="white-space:nowrap;">' + savedCard.loaithe + '</td><td style="white-space:nowrap;">' + 'MT:' + savedCard.code + ' SR:' + savedCard.serial + '</td> <td style="white-space:nowrap;">' + savedCard.menhgia + 'đ</td><td style="white-space:nowrap;">+0$</td></tr>';
                            const caaaa = await UserControl.topup(req.user_id, declared)
                            const cccc = await UserControl.upMoney(req.user_id, vangcong)
                            const cccczz = await UserControl.upKimcuong(req.user_id, declared / setting.tile.kimcuong)
                            const sodu = await UserControl.sodu(req.user_id, "Nạp thẻ cào", "+" + numberWithCommas(vangcong))
                            return res.json({ error: 0, message: "<strong>Thành công!</strong> " + resJ.message, table: table });
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                    return res.json({ error: 1, message: "<strong>Thất bại! </strong>" + "Lỗi không xác định" });
                }
                else if (resJ.status == 99) {
                    console.log(resJ)
                    const addCard = new Card({
                        code: code,
                        serial: serial,
                        loaithe: telco,
                        menhgia: declared,
                        amount: resJ.amount,
                        status: 0,
                        message: resJ.message,
                        server: req.user.server,

                        requestid: requestId,
                        uid: req.user._id


                    })
                    try {
                        const savedCard = await addCard.save()
                        console.log(savedCard)
                        var table = '<tr><td style="white-space:nowrap;"><span class="badge badge-warning" style="padding: 5px">' + resJ.message + '</span></td> <td style="white-space:nowrap;">' + savedCard.time + '</td><td style="white-space:nowrap;">' + savedCard.loaithe + '</td><td style="white-space:nowrap;">' + 'MT:' + savedCard.code + ' SR:' + savedCard.serial + '</td> <td style="white-space:nowrap;">' + savedCard.menhgia + 'đ</td><td style="white-space:nowrap;">+0$</td></tr>';
                        res.json({ error: 0, message: "<strong>Thành công!</strong> " + resJ.message, table: table });
                    }
                    catch (err) {

                        console.log(err)
                    }
                }
                else {
                    console.log(resJ)
                    res.json({ error: 1, message: "<strong>Thất bại! </strong>" + resJ.message });
                }

            });
        }
        catch { res.json({ error: 1, message: "<strong>Thất bại! </strong>Lỗi không xác định." }) }

    }

})


router.get('/napmomo', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }
    const chietkhau = await ChietKhau.findOne({ server: req.user.server })
    const setting = await Setting.findOne({ setting: "setting" })

    res.render("index", { page: "pages/user/napmomo", menu: menuAction('napmomo'), data: req.user, tile: chietkhau.vi, momo: setting.naptien.momo })
})
router.post('/napmomo', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.json({ error: 1, message: "<strong>Thất bại! </strong>Vui lòng đăng nhập" });
    }
    else if (req.body.type) {
        const listTsr = await Momo.find({ uid: req.user._id })
        return res.send(listTsr)
    }


})






router.get('/naptsr', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }
    const chietkhau = await ChietKhau.findOne({ server: req.user.server })
    res.render("index", { page: "pages/user/naptsr", menu: menuAction('naptsr'), data: req.user, tile: chietkhau.vi })
})
router.post('/naptsr', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.json({ error: 1, message: "<strong>Thất bại! </strong>Vui lòng đăng nhập" });
    }
    else if (req.body.type) {
        const listTsr = await Tsr.find({ uid: req.user._id })
        return res.send(listTsr)
    }

    else {
        const magd = req.body.id;
        // var tsr = await TheSieuRe(magd);
        // //  console.log(tsr)
        // if (tsr == "null") {
        //     return res.json({ error: 1, message: "<strong>Thất bại! </strong>Không tìm thấy giao dịch này" });
        // }
        // else
        //     if (tsr == "loi") {
        //         return res.json({ error: 1, message: "<strong>Thất bại! </strong>Mất kết nối với TheSieuRe.Com vui lòng thử lại sau" });
        //     }
        //     else if (tsr) {



        const tsr = await Tsr.findOne({ magd: magd })
        if (tsr) {
            if (tsr.uid == null) {
                const chietkhau = await ChietKhau.findOne({ server: req.user.server })
                const setting = await Setting.findOne({ setting: "setting" })
                const magd = tsr.magd;
                const sotien = tsr.sotien;
                const status = "Thành công";

                var thucnhan = 0;
                if (sotien >= 50000) {
                    thucnhan = (sotien * chietkhau.vi) + getRandomIntInclusive(2000000, 10000000);
                }
                else {
                    thucnhan = (sotien * chietkhau.vi)
                }

                // try {
                var check = await UserControl.upMoney(req.user._id, +thucnhan)
                if (check == "loi") {
                    return res.json({ error: 1, message: "<strong>Thất bại! </strong>Có lỗi đã xảy ra vui lòng thử lại" });
                }
               

                const updateTsr = await Tsr.findByIdAndUpdate(tsr._id, { uid: req.user._id, status: status, thucnhan: thucnhan })

                await UserControl.sodu(req.user._id, "Nạp từ ví TheSieuRe.Com", "+" + numberWithCommas(thucnhan))
                const caaaa = await UserControl.topup(req.user._id, sotien)
                const ccccc = await UserControl.upKimcuong(req.user._id, sotien / setting.tile.kimcuong)
                return res.json({ error: 0, message: "<strong>Thành công! </strong>Nạp thành công " + numberWithCommas(thucnhan) + "$" });
            }
            else {
                return res.json({ error: 1, message: "<strong>Thất bại! </strong>Mã này đã nạp từ trước rồi nhé" });
            }
        }
        else {
            return res.json({ error: 1, message: "<strong>Thất bại! </strong>Không tìm thấy mã giao dịch này hoặc chờ ít phút rồi thử lại" });

        }
        // }
        // catch { }
        //         }
        //         else {
        //             return res.json({ error: 1, message: "<strong>Thất bại! </strong>Có lỗi đã xảy ra vui lòng thử lại sau" });
        //         }
    }
})




router.get('/sodu/:page', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }
    var perPage = 9
    var page = req.params.page || 1

    var data = await Sodu.find({ uid: req.user._id }).skip((perPage * page) - perPage).limit(perPage).sort({ 'time': -1 });
    var count = await Sodu.countDocuments({ uid: req.user._id });
    //console.log(count)
    return res.render('index', { page: "pages/user/sodu", menu: menuAction('sodu/1'), data: req.user, products: data, current: page, pages: Math.ceil(count / perPage) })



    res.render("index", { page: "pages/user/sodu", menu: menuAction('sodu'), data: req.user })
})

router.get('/csmm/:page', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }
    var perPage = 9
    var page = req.params.page || 1

    var data = await Cuoc.find({ uid: req.user._id }).skip((perPage * page) - perPage).limit(perPage).sort({ 'time': -1 });
    var count = await Cuoc.countDocuments({ uid: req.user._id });
    console.log(count)
    return res.render('index', { page: "pages/user/csmm", menu: menuAction('csmm/1'), data: req.user, products: data, current: page, pages: Math.ceil(count / perPage) })

    // res.render("index", { page: "pages/user/csmm", menu: menuAction('csmm'), data: req.user })
})

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
    return Math.floor(seconds)
}
router.get('/chuyenvang', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }
    const lsgd = await Chuyentien.find({ $or: [{ nguoigui: req.user._id }, { nguoinhan: req.user._id }] }).sort({ time: -1 })

    table = "";
    lsgd.forEach((item) => {
        var typeeee = "";
        if (item.nguoigui.toString() == req.user._id.toString()) {

            typeeee = "Chuyển tiền cho " + item.tennhan;
        }
        if (item.nguoinhan.toString() == req.user._id.toString()) {

            typeeee = "Nhận tiền từ " + item.tenchuyen;
        }

        table += "<tr><td>" + new Date(item.time).toLocaleString() + "</td><td>" + typeeee + "</td><td>" + numberWithCommas(item.sovang) + "</td><td>" + '<span class="badge badge-success">Thành công</span>' + "</td></tr>";

    })

    res.render("index", { page: "pages/user/chuyenvang", menu: menuAction('chuyenvang'), data: req.user, table: table })
})
router.post('/chuyenvang', async (req, res, next) => {
    return res.send({ error: 1, message: "Chức năng này đang bảo trì!" })

    if (!req.user.isLogin) {
        return res.send({ error: 1, message: "Vui lòng đăng nhập!" })
    }

    // console.log(req.body)
    if (req.session.time) {
        if (timeSince(req.session.time) < 5) {
            return res.send({ error: 1, message: "Bình tĩnh bác ơi!" })
        }
    }
    req.session.time = Date.now()
    if (req.body.to == req.user.name) {
        return res.send({ error: 1, message: "<strong>Thất bại </strong>Không thể chuyển tiền cho chính mình" })
    }
    const to = req.body.to
    const gold = req.body.gold
    var goldchuyen = 0;
    if (gold == 0) goldchuyen = 10000000
    else if (gold == 1) goldchuyen = 20000000
    else if (gold == 2) goldchuyen = 50000000
    else if (gold == 3) goldchuyen = 100000000
    else if (gold == 4) goldchuyen = 200000000
    else if (gold == 5) goldchuyen = 500000000

    if (goldchuyen == 0) { return }

    const user = await User.findOne({ username: to })
    const meeeeeeee = await User.findById(req.user._id)
    if (!user) { return res.send({ error: 1, message: "<strong>Thất bại! </strong>Nhân vật này không tồn tại" }) }

    if (user.server != req.user.server) {
        return res.send({ error: 1, message: "<strong>Thất bại! </strong>Người nhận không cùng Server" })
    }
    const cuocs = await Cuoc.countDocuments({ uid: meeeeeeee._id, status: { $ne: 5 } })
    if (!cuocs || cuocs < 5) {
        return res.send({ error: 1, message: "<strong>Thất bại: </strong> Đặt cược trên 5 ván mới có thể chuyển !!!" });
    }

    if (meeeeeeee) {

        if (meeeeeeee.vang < goldchuyen) {
            return res.send({ error: 1, message: "<strong>Thất bại </strong>Bạn không đủ vàng để chuyển" })
        }
        const chuyenvang = new Chuyentien({ tenchuyen: req.user.name, tennhan: to, nguoinhan: user._id, nguoigui: req.user._id, noidung: "", sovang: goldchuyen, status: "Thành công" })
        const newchuyenvang = await chuyenvang.save()
        if (newchuyenvang) {
            const myyy = await UserControl.upMoney(req.user._id, -goldchuyen)

            if (myyy) {
                const char = await UserControl.upMoney(user._id, +goldchuyen)
                if (char) {
                    const meeesdf = await UserControl.sodu(meeeeeeee._id, "-" + numberWithCommas(goldchuyen), "Chuyển vàng cho " + to)
                    const charsfgdfg = await UserControl.sodu(user._id, "+" + numberWithCommas(goldchuyen), "Nhận vàng từ " + meeeeeeee.username)
                    table = "<tr><td>" + new Date(newchuyenvang.time).toLocaleString() + "</td><td>" + "Chuyển vàng cho " + to + "</td><td>" + numberWithCommas(goldchuyen) + "</td><td>" + '<span class="badge badge-success">Thành công</span>' + "</td></tr>";
                    return res.send({ error: 0, message: "<strong>Thành công! </strong>Chuyển vàng thành công", table: table })
                }
            }
        }
    }
    else { return res.send({ error: 1, message: "<strong>Thất bại! </strong>Có lỗi đã xảy ra vui lòng thực hiện lại" }) }

})





function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
router.post('/changepass', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.json({ error: 1, message: "<b>Thất bại! </b>Vui lòng đăng nhập" });
    }
    else {
        const mkcu = escapeHtml(req.body.password);
        const mkmoi = escapeHtml(req.body.npassword);
        const mkre = escapeHtml(req.body.rpassword);
        if (mkcu && mkmoi && mkre) {
            if (mkcu.length < 6 || mkmoi.length < 6 || mkre.length < 6 || mkcu.length > 16 || mkmoi.length > 16 || mkre.length > 16) {
                return res.json({ error: 1, message: "<strong>Thất bại!</strong> Mật khẩu phải là 1 chuỗi kí tự lớn hơn hoặc bằng 6 kí tự" });
            }
            var arr = mkcu.match(/([0-9]|[a-z]|[A-Z])/g);
            var arr2 = mkmoi.match(/([0-9]|[a-z]|[A-Z])/g);
            var arr3 = mkre.match(/([0-9]|[a-z]|[A-Z])/g);
            if (arr.length != mkcu.length || arr2.length != mkmoi.length || arr3.length != mkre.length) {
                return res.json({ error: 1, message: "<strong>Thất bại!</strong> Mật khẩu phải là 1 chuỗi kí tự từ a -> z, A -> Z hoặc 0 -> 9" });
            }
            if (mkmoi != mkre) {
                return res.json({ error: 1, message: "<strong>Thất bại!</strong> Mật khẩu nhập lại không trùng" });
            }
            try {
                const user = await User.findOne({ _id: req.session.userId })
                if (user.username == mkmoi) return res.json({ error: 1, message: '<strong>Thất bại! </strong>Mật khẩu không được giống tài khoản' })
                const vaildPass = await bcrypt.compare(mkcu, user.password)

                if (!vaildPass) return res.json({ error: 1, message: '<strong>Thất bại! </strong>Mật khẩu cũ không chính xác' })

                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(mkmoi, salt)

                await User.updateOne({ _id: user._id }, { password: hashPassword })
                return res.json({ error: 0, message: "<b>Thành công! </b>Đổi mật khẩu thành công" });
            } catch { }
            return res.json({ error: 1, message: "<b>Thất bại! </b>Có lỗi đã xảy ra" });
        }

    }

})
router.get('/vongquay', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }
    res.render("index", { page: "pages/user/vongquay", data: req.user })
})
router.post('/vongquay', async (req, res) => {

    if (!req.user.isLogin) {
        const data = {
            modal: "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" id=\"modal\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\">Thông báo</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <p style='color: red'><strong>Vui lòng đăng nhập</strong></p>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Đóng</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"
            , script: "<script> $('#modal').modal('show'); </script>"
            , status: 0
        }
        return res.send(data)
    }
    const action = req.body.action
    if (action == "loadls") {
        const record = req.body.record;
        if (record == 0) {
            const getVq = await Vongquay.find({}).sort({ time: -1 }).limit(10)
            var table = "";
            getVq.forEach(item => {
                table += '<tr><td>' + new Date(item.time).toLocaleTimeString() + '</td><td>' + item.name + '<td>' + item.phanthuong + '</td></tr>'
            })
            return res.send(table);
        }
        if (record == 1) {
            const getVq = await Vongquay.find({ uid: req.user._id }).sort({ time: -1 }).limit(10)
            var table = "";
            getVq.forEach(item => {
                table += '<tr><td>' + new Date(item.time).toLocaleTimeString() + '</td><td>' + item.name + '<td>' + item.phanthuong + '</td></tr>'
            })
            return res.send(table);
        }
        return res.send("");
    }
    else
        if (action == "submit") {

            // const trukimcuong = await User.findByIdAndUpdate(req.user._id, { $inc: { kimcuong: 10 } })

            const user = await User.findById(req.user._id)

            if (user) {


                if (user.kimcuong < 10) {
                    const data = {
                        modal: "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" id=\"modal\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\">Thông báo</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <p style='color: red'><strong>Thất bại! kim cương không đủ</strong></br>Bạn cần thêm ít nhất " + (10 - user.kimcuong) + " kim cương nữa</strong></p>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Đóng</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"
                        , script: "<script> $('#modal').modal('show'); </script>"
                        , status: 0
                    }
                    return res.send(data)
                }

                const trukimcuong = await User.findByIdAndUpdate(user._id, { $inc: { kimcuong: -10 } }, { new: true })

                if (trukimcuong) {
                    if (trukimcuong.kimcuong + 10 == req.user.kimcuong) {



                        const count = req.body.count
                        const typequay = count % 2 == 0 ? '+' : '-'

                        var giaiii = []

                        if (typequay == "-") {
                            giaiii = [
                                { vitri: 3645, pct: 26, giai: "50 triệu", type: 2 },
                                { vitri: 3645 * 2, pct: 30, giai: "10 triệu", type: 1 },
                                { vitri: 3645 * 3, pct: 0, giai: "1 tỷ", type: 6 },
                                { vitri: 3645 * 4, pct: 10, giai: "100 triệu", type: 3 },
                                { vitri: 3645 * 5, pct: 1, giai: "500 triệu", type: 5 },
                                { vitri: 3645 * 6, pct: 31, giai: "2 -> 9 triệu", type: 0 },
                                { vitri: 3645 * 7, pct: 0, giai: "5 tỷ", type: 7 },
                                { vitri: 3645 * 8, pct: 2, giai: "250 triệu", type: 4 }
                            ];
                        } else {
                            giaiii = [
                                { vitri: 3645, pct: 0, giai: "5 tỷ", type: 7 },
                                { vitri: 3645 * 2, pct: 31, giai: "2 -> 9 triệu", type: 0 },
                                { vitri: 3645 * 3, pct: 1, giai: "500 triệu", type: 5 },
                                { vitri: 3645 * 4, pct: 10, giai: "100 triệu", type: 3 },
                                { vitri: 3645 * 5, pct: 0, giai: "1 tỷ", type: 6 },
                                { vitri: 3645 * 6, pct: 30, giai: "10 triệu", type: 1 },
                                { vitri: 3645 * 7, pct: 26, giai: "50 triệu", type: 2 },
                                { vitri: 3645 * 8, pct: 2, giai: "250 triệu", type: 4 }
                            ];
                        }

                        const expanded = giaiii.flatMap(giai => Array(giai.pct).fill(giai));
                        const winner = expanded[Math.floor(Math.random() * expanded.length)];
                        var goldwin = 0;
                        if (winner.type == 0) goldwin = getRandomIntInclusive(2000000, 9500000);
                        else if (winner.type == 1) goldwin = 10000000;
                        else if (winner.type == 2) goldwin = 50000000;
                        else if (winner.type == 3) goldwin = 100000000;
                        else if (winner.type == 4) goldwin = 250000000;
                        else if (winner.type == 5) goldwin = 500000000;
                        else if (winner.type == 6) goldwin = 1000000000;
                        else if (winner.type == 7) goldwin = 5000000000;

                        await UserControl.upMoney(user._id, goldwin)
                        await UserControl.sodu(user._id, "+" + numberWithCommas(goldwin), "Vòng quay may mắn")
                        const newLs = Vongquay({ phanthuong: winner.giai + " vàng", uid: user._id, name: user.username })
                        const Lsnew = await newLs.save();
                        const data = {
                            modal: "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" id=\"modal\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\">Thông báo</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        Bạn nhận được <strong style='color: green'>" + winner.giai + " vàng</strong> từ <strong>vòng quay may mắn</strong>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Đóng</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"
                            , script: "<script> $('#modal').modal('show'); </script>"
                            , status: 100
                            , transform: "rotate(" + typequay + winner.vitri + "deg)"
                        }
                        res.send(data)
                    }
                }
            }
        }
})
router.post('/nhanvip', async (req, res) => {
    if (!req.user.isLogin) {
        var msss = 'Vui lòng đăng nhập';
        return res.send({ error: 1, message: msss })
    }
    var vipp = 0;
    var phanthuong = 0;
    if (req.user.topup >= 100000) {
        vipp = 1;
        phanthuong = 1000000
    }
    if (req.user.topup >= 500000) {
        vipp = 2;
        phanthuong = 7000000
    }
    if (req.user.topup >= 2000000) {
        vipp = 3;
        phanthuong = 35000000
    }
    if (req.user.topup >= 5000000) {
        vipp = 4;
        phanthuong = 100000000
    }
    if (req.user.topup >= 10000000) {
        vipp = 5;
        phanthuong = 225000000
    }
    if (req.user.topup >= 20000000) {
        vipp = 6;
        phanthuong = 500000000
    }

    if (req.user.topup < 100000) {
        var msss = 'Thật đáng tiếc, chức năng chỉ dành cho <strong class="text-danger">thành viên VIP</strong> !!!<br>Bạn cần nạp <strong class="text-danger">ít nhất 100k</strong> để được <strong class="text-danger">VIP</strong>';
        return res.send({ error: 1, message: msss })
    }
    var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
    var d = new Date();
    d.setDate(new Date().getDate() + 1);
    var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
    const checkVip = await User.findOne({ _id: req.user._id, timetopup: { $gte: new Date(today), $lt: new Date(tomorrow) } })
    if (!checkVip) {
        const updateeee = await User.updateOne({ _id: req.user._id }, { timetopup: new Date(today) })
        const ussss = await UserControl.upMoney(req.user._id, phanthuong);
        const ussssz = await UserControl.sodu(req.user._id, "+" + numberWithCommas(phanthuong), "Nhận quà vip");
        var msss = '<div class="modal-body" id="result_qua">Bạn đang là <strong class="text-danger">thành viên VIP</strong>  <img src="images/vip/vip' + vipp + '.png" style=" max-width: 50px; height: auto" ;="" padding:="" 0;="" margin-bottom:="" 10px"="" alt=""> <hr class="mb-3"> Bạn nhận được <strong class="text-success"> ' + numberWithCommas(phanthuong) + ' vàng !!!</strong></div>';
        return res.send({ error: 1, message: msss })
    }
    return res.send({ error: 1, message: 'Bạn đang là <strong class="text-danger">thành viên VIP</strong>  <img src="images/vip/vip' + vipp + '.png" style=" max-width: 50px; height: auto" ;="" padding:="" 0;="" margin-bottom:="" 10px"="" alt=""> <hr class="mb-3"> Hôm nay bạn <strong class="text-success">đã nhận thưởng</strong> rồi!!! <br><strong class="text-danger ">Vui lòng chờ tới ngay mai!!!</strong>' })

})
router.get('/gifcode', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }

    res.render("index", { page: "pages/user/gifcode", data: req.user })
})
// new Gifcode({code:123123,phanthuong:9999999}).save()
// new Gifcode({code:12311123,phanthuong:9999999}).save()
// new Gifcode({code:1232212333,phanthuong:9999999}).save()
// new Gifcode({code:1231444423,phanthuong:9999999}).save()
router.post('/gifcode', async (req, res) => {
    if (!req.user.isLogin) {
        return res.send({ error: 1, message: "Vui lòng đăng nhập!" })
    }
    if (req.body.gethistory) {

        if (req.body.type != 0 && req.body.type != 1) {
            return
        }
        var gcode = null;
        if (req.body.type == 0) {
            gcode = await Gifcode.find({ status: 1 }).sort({ time: -1 }).limit(7)
        }
        else {
            gcode = await Gifcode.find({ status: 1, name: req.user.name }).sort({ time: -1 }).limit(7)
        }
        var table = "";
        gcode.forEach((item) => {
            table += '<tr><td>' + new Date(item.time).toLocaleString() + '</td><td>' + item.name + '</td><td>' + item.code + '</td><td>' + numberWithCommas(item.phanthuong) + '</td></tr>'
        })
        return res.send(table)
    }
    if (req.user.topup < 100000) {
        return res.send({ error: 1, message: "Bạn không phải thành viên vip!" })
    }
    if (req.user.thanhtichngay < 100000000) {
        return res.send({ error: 1, message: "Vui lòng đặt cược trên 100tr vàng để nhập gifcode!" })
    }

    if (req.session.captcha != req.body.captcha) {
        req.session.captcha = "aloo"
        return res.send({ error: 1, message: "Bạn đã nhập sai captcha!" })
    }

    const code = req.body.code
    const gifcode = await Gifcode.findOneAndUpdate({ code: code, status: 0 }, { status: 1, name: req.user.name }, { new: true })
    if (!gifcode) {
        req.session.captcha = "aloo"
        return res.send({ error: 1, message: "Gifcode không tồn tại hoặc đã sử dụng!" })
    }
    const upXu = await UserControl.upMoney(req.user._id, gifcode.phanthuong)
    const sodu = await UserControl.sodu(req.user._id, "+" + numberWithCommas(gifcode.phanthuong), "Nhập gifcode")
    req.session.captcha = "aloo"
    return res.send({ error: 0, message: "Bạn đã nhập gifcode và nhận " + numberWithCommas(gifcode.phanthuong) + " vàng" })
})

router.get('/imageGen', function (req, res, next) {

    var c = new Captcha({
        length: 3, // Captcha length
        size: {    // output size
            width: 450,
            height: 200
        }
    });

    req.session.captcha = c.value
    c.toBase64(function (err, base64) {
        base64Data = base64.replace(/^data:image\/png;base64,/, "");
        base64Data += base64Data.replace('+', ' ');
        //console.log(base64Data);
        binaryData = Buffer.from(base64Data, 'base64').toString('binary');
        if (err) {
            //console.log("Captcha Error");
            //console.log(err);
        }
        else {
            res.contentType('image/png');
            res.end(binaryData, 'binary');
        }
    });
});

router.get('/xosokeno', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }
    res.render("index", { page: "pages/user/xosokeno", data: req.user })
})

router.get('/thumua', async (req, res, next) => {
    if (!req.user.isLogin) {
        return res.redirect('/user/login');
    }
    const chietkhau = await ChietKhau.findOne({ server: req.user.server })
    res.render("index", { page: "pages/user/thumua", data: req.user })
})
module.exports = router