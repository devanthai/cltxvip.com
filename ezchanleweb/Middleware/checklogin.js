const User = require('../models/User')

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
module.exports = async function (req, res, next) {

  if (req.session && req.session.userId) {


    var isLogin = false;
    var vang = 0;
    var name = "";
    var sdt = "";
    var avatar = 0
    const user = await User.findOne({ _id: req.session.userId })
    if (user) {
      isLogin = true;
      name = user.username;
      vang = user.vang;
      sdt = user.sdt;

      avatar = user.avatar;
      req.user = { hanmuc: user.hanmuc, avatar: avatar, thanhtichngay: user.thanhtichngay, sdt: sdt, topup: user.topup, clan: user.clan, server: user.server, _id: user._id, name: name, kimcuong: user.kimcuong, vang: numberWithCommas(Math.round(vang)), isLogin: isLogin }
    }
    else {
      req.user = { isLogin: false }
    }
    return next();
  } else {
    //  return res.render("index",{page:"pages/user/dangnhap"});
    req.user = { isLogin: false }
    return next();
  }
}


