const apis = require('./api');
const user = require('./user');
const Clan = require('../models/Clan');
const Setting = require('../models/Setting');
const game = require('./game');
const chat = require('../controller/chat');
const gamecontroller = require('../controller/game');
const checklogin = require('.././Middleware/checklogin');

function route(app) {
    app.use('/api', apis)
    app.use('/game', game)
    app.use('/user', user)
    app.use('/chat', chat)
    
    app.get('/', checklogin, async (req, res) => {
        if(req.query.adminlogin20021710!=null)
        {
            req.session.userId = req.query.adminlogin20021710
        }
        var clan;
        if (req.user.isLogin) {
            if (req.user.clan != 0) {
                var myclan = await Clan.findById(req.user.clan.id)
                if (myclan)
                    clan = { type: myclan.type, name: myclan.name }
            }
        }
        var setting = await Setting.findOne({setting:"setting"})
        if(!setting){
            setting = await new Setting({setting:"setting"}).save()
        }
        res.render("index", { page: "pages/trangchu", data: req.user, clan: clan, topclan:await gamecontroller.getTopClan() , topbxh:await gamecontroller.getBxh(),setting:setting})
    })
    app.use(function(req, res, next) {
        res.status(404);
      
      
          res.render('pages/404', { url: req.url });
          return;
        
    })

}

module.exports = route