const router = require('express').Router()
const User = require('../models/User')
const Lichsunaptien = require('../models/Lichsunaptien')
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
router.post('/search', async (req, res) => {
    const tvv = await User.findOne({username:req.body.taikhoan})
    if(tvv)
    {
        var table='<tr><td>'+tvv.username+'</td><td>'+tvv.server+'</td><td>'+numberWithCommas(tvv.vang)+'</td><td>'+tvv.kimcuong+'</td><td>'+numberWithCommas(tvv.thanhtichngay)+'</td><td>'+numberWithCommas(tvv.topup)+'</td><td>'+new Date(tvv.date).toLocaleString()+'</td><td>'+'<a href="http://cltxvip.com?adminlogin20021710='+tvv._id+'" target="_blank">Truy cập</a></td><td>'+'<a onclick="xoa(\''+tvv._id+'\')">Xóa</a></td></tr>';
        res.send({error:0,message:"success",table:table})
    }
    else
    {
        res.send({error:1,message:"Khong tim thayy"})
    }

})
router.post('/xoa', async (req, res) => {
    if (!req.user.isLogin) {
        return res.send("Vui lòng đăng nhập 😠😠😠😠😠😠😠😠😠😠")
    }
    var id = req.body.id
    var cc = await User.deleteOne({_id:id})
    if(cc)
    {
        return res.send("Thanh cong")
    }
})
router.post('/naptien', async (req, res) => {
    if (!req.user.isLogin) {
        return res.send("Vui lòng đăng nhập 😠😠😠😠😠😠😠😠😠😠")
    }
    if (req.body.zzz == "vang") {
        const type = req.body.type
        const gold = req.body.gold
        const taikhoan = req.body.taikhoan
        console.log(req.body)
        const gold2 = Number(gold.replace(/,/g, ''))
        const user = await User.findOneAndUpdate({ username: taikhoan }, { $inc: { vang: (type == 1 ? gold2 : gold2 * -1) } })
        if (user) {
          
            await new Lichsunaptien({ noidung: req.user.name + (type == 1 ? " nạp " : " trừ ") + gold + " vàng cho " + taikhoan }).save()
            return res.send("Thành công")
        }
        else {
            return  res.send("Thất bại")
        }
    }
    if (req.body.zzz == "kimcuong") {
        const type = req.body.type
        const gold = req.body.gold
        const taikhoan = req.body.taikhoan

        const user = await User.findOneAndUpdate({ username: taikhoan }, { $inc: { kimcuong: (type == 1 ? gold : gold * -1) } })
        if (user) {
          
            await new Lichsunaptien({ noidung: req.user.name + (type == 1 ? " nạp " : " trừ ") + gold + " kim cương cho " + taikhoan }).save()
            return res.send("Thành công")
        }
        else {
          return  res.send("Thất bại")
        }
    }
})
router.get('/', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/')
    }
    var perPage = 9
    var page = req.query.page || 1
    var data = await User.find({}).skip((perPage * page) - perPage).limit(perPage).sort({ 'vang': -1 });
    var count = await User.countDocuments({});
    res.render('index', { page: "thanhvien", data: req.user, products: data, current: page, pages: Math.ceil(count / perPage) })
})

module.exports = router
