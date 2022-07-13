const router = require('express').Router()
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
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
router.get('/',async(req,res)=>{
    req.session = null
    res.render("pages/auth")
})
module.exports = router
