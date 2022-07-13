const router = require('express').Router()
const Lichsunaptien = require('../models/Lichsunaptien')



router.get('/', async (req, res) => {
    if (!req.user.isLogin) {
        return res.redirect('/')
    }
    var perPage = 9
    var page = req.query.page || 1
    var data = await Lichsunaptien.find({}).skip((perPage * page) - perPage).limit(perPage).sort({ 'time': -1 });
    var count = await Lichsunaptien.countDocuments({});
    res.render('index',{page:"hisadmin",data:req.user,lichsu: data, current: page, pages: Math.ceil(count / perPage)})

})
module.exports = router
