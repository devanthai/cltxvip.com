const router = require('express').Router()
const ChietKhau = require('../models/ChietKhau')


router.post('/',async (req,res)=>{
    const chietkhau =  await ChietKhau.deleteMany({})
    console.log(chietkhau)
    var data = JSON.parse(req.body.jssss)
    data.forEach( async(element) => {
        await new ChietKhau({server:element.server,vi:element.vi,card:element.card}).save()
    });
    
    if(chietkhau)
    {
        res.send("thanh cong")
    }
    else
    {
        res.send("that bai")
    }
})
router.get('/', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/')
    }
    const chietkhau =  await ChietKhau.find({})
    res.render('index',{page:"chietkhau",data:req.user,chietkhau:JSON.stringify(chietkhau)})

})
module.exports = router
