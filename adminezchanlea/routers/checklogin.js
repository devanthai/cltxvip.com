const Admin = require('../models/Admin')


module.exports = async function  (req, res, next) {

    if (req.session && req.session.userId) {
    
      
      var isLogin = false;
      var name = "";
      const user = await Admin.findOne({_id:req.session.userId})
      isLogin = true;
      name = user.username;
  
      req.user = {_id:user._id,name:name,isLogin:isLogin}
      return next();
    } else {
      //  return res.render("index",{page:"pages/user/dangnhap"});
      req.user ={isLogin:false}
      return next();
    }
  }

  
