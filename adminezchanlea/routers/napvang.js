const router = require('express').Router()
const Napvang = require('../models/Napvang')
const Botvang = require('../models/Botvang')
const Botnap = require('../models/Botnap')
const Botrut = require('../models/Botrut')


router.get('/remove',async (req,res)=>{

    const cc = await  Botvang.remove({})
    const ccz = await  Botnap.remove({})
    const cczz= await  Botrut.remove({})
    res.send("cccc")
})
router.get('/', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/')
    }
    var perPage = 9
    var page = req.query.page || 1
    var data = await Napvang.find({}).skip((perPage * page) - perPage).limit(perPage).sort({ 'time': -1 });
    var count = await Napvang.countDocuments({});
    res.render('index',{page:"napvang",data:req.user,napvang: data, current: page, pages: Math.ceil(count / perPage)})

})
module.exports = router
