const router = require('express').Router()
const Admin = require('../models/Admin')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        // cannot access session here
    })
    res.redirect('/')
});
router.get('/rmadmin', async (req, res) => {

    const vvv = await Admin.deleteMany({})
    res.send(vvv);
})



router.post('/changepass', async (req, res) => {

    var mkcu = req.body.mkcu
    var mkmoi = req.body.mkmoi

    try {
        const user = await Admin.findOne({ _id: req.session.userId })

        const vaildPass = await bcrypt.compare(mkcu, user.password)

        if (!vaildPass) return res.send({ error: 1, message: 'Mật khẩu cũ không chính xác' })

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(mkmoi, salt)

        await Admin.updateOne({ _id: user._id }, { password: hashPassword })
        req.session.destroy(function (err) {

        })
        return res.json({ error: 0, message: "Đổi mật khẩu thành công" });
    } catch {

        return res.json({ error: 1, message: "Lỗi không xác định vui lòng thử lại" });
    }

});


router.get('/addadmin', async (req, res) => {

    await Admin.deleteMany({})

    const saltz = await bcrypt.genSalt(10)

    const hashPasswordzz = await bcrypt.hash("thaieahleo13@", saltz)
    await new Admin({ username: "thaipro2k2", password: hashPasswordzz }).save()

    const hashPasswordz = await bcrypt.hash("thucthuc@111", saltz)
    await new Admin({ username: "thucthuc", password: hashPasswordz }).save()
})
router.get('/', (req, res) => {



    if (req.user.isLogin) {
        return res.redirect('/')
    }
    res.render('user/login')
})
router.post('/', async (req, res) => {
    const taikhoan = req.body.taikhoan
    const matkhau = req.body.matkhau
    const admin = await Admin.findOne({ username: taikhoan })

    if (!admin) {
        return res.send("taikhoan hoac mat khau k chinh xacs")
    }

    const vaildPass = await bcrypt.compare(matkhau, admin.password)

    if (!vaildPass) {
        return res.send("taikhoan hoac mat khau k chinh xacs")
    }
    req.session.userId = admin._id
    res.send("thanhcong")
})
module.exports = router
