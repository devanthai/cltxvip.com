const Gamez = require('../models/Game')
const Setting = require('../models/Setting')
const Cuoc = require('../models/Cuoc')
const Chat = require('../models/Chat')
const Clan = require('../models/Clan')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Gifcode = require('../models/Gifcode')
const jwt = require('jsonwebtoken')
const userControl = require('../controller/user')
const { w3cwebsocket } = require('websocket')
const Nohu = require('../models/nohu/Nohu')
var ObjectId = require('mongoose').Types.ObjectId;

const fs = require('fs');
function Isjson(json) {
  try {
    JSON.parse(json)
  }
  catch {
    return false
  }
  return true;

}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var userOnline = 0;
var ketquasv1 = -1;
var ketquasv2 = -1;
var ketquasv3 = -1;


var kqs = [
  { server: 1, kq: Math.round(getRandomIntInclusive(0, 99)) },
  { server: 2, kq: Math.round(getRandomIntInclusive(0, 99)) },
  { server: 3, kq: Math.round(getRandomIntInclusive(0, 99)) }

]
var time = 15;
var timecsmm = "24/24"
var ketqua = getRandomIntInclusive(0, 99)
var timewait = false;
function getStatus(kq, type, value) {

  const xiu = kq < 50
  const tai = kq >= 50
  const chan = kq % 2 == 0

  if (type == 0) {
    if ((chan && value == 0) || (!chan && value == 1) || (tai && value == 2) || (xiu && value == 3)) return 1;
    else return 2
  }
  else if (type == 4) {
    if ((chan && tai && value == 0) || (chan && xiu && value == 1) || (!chan && tai && value == 2) || (!chan && xiu && value == 3)) {
      return 1;
    }
    else return 2
  }
  else
    if (type == 2) {
      if (kq == value) { return 1 }
      else { return 2 }
    }
}

var isRunsv1 = false
var isRunsv2 = false
var isRunsv3 = false

function SetRunFalse(server) {

  if (server == 1) isRunsv1 = false
  if (server == 2) isRunsv2 = false
  if (server == 3) isRunsv3 = false

}
function SetRunTrue(server) {
  if (server == 1) isRunsv1 = true
  if (server == 2) isRunsv2 = true
  if (server == 3) isRunsv3 = true

}
function CheckRun(server) {
  if (server == 1 && isRunsv1) return true
  if (server == 2 && isRunsv2) return true
  if (server == 3 && isRunsv3) return true


  return false
}
async function chayGame(server, ws) {
  if (!CheckRun(server)) {
    SetRunTrue(server)

    try {
      var ccc = server
      var ketquazz = kqs.find(({ server }) => server === ccc).kq
      const phienChay = await Gamez.findOne({ server: server, status: 0 }).sort({ $natural: -1 })
      //  console.log(phienChay)

      if (!phienChay) {
        const game = new Gamez({ server: server, ketquatruoc: ketquazz, time: time, timeCsmm: timecsmm })
        try {
          const savedgame = await game.save()
        }
        catch (err) { }
      }
      else if (time > phienChay.time) {
        let game = await Gamez.findByIdAndUpdate(phienChay._id, { status: 1, ketqua: ketquazz });
        let cuocs = await Cuoc.find({ status: -1, server: server })
        try {
          ws.wsall(JSON.stringify({ "typechat": "2", "server": server, "type": "BOT", "name": "Hệ thống", "noidung": " Kết quả con số may mắn: " + ketquazz }))
          ws.wsall(JSON.stringify({ "typechat": "2", "server": server, "type": "BOT", "name": "Hệ thống", "noidung": " Chúc mừng các bạn đặt cược " + (ketquazz % 2 == 0 ? "Chẵn" : "Lẻ") + " và " + (ketquazz >= 50 ? "Tài" : "Xỉu") }))
        } catch { }
        const setting = await Setting.findOne({ setting: "setting" })

        cuocs.map(async (cuoc) => {




          if (cuoc.phien == phienChay._id) {

            const status = getStatus(Math.round(ketquazz), cuoc.type, cuoc.chon);
            var vangnhan = 0;

            if (status == 1) {
              if (cuoc.type == 0) {
                vangnhan = cuoc.vangdat * setting.tile.cltx
              }
              else if (cuoc.type == 4) {
                vangnhan = cuoc.vangdat * setting.tile.xien
              }
              else if (cuoc.type == 2) {
                vangnhan = cuoc.vangdat * setting.tile.dudoankq
              }
              await userControl.upMoney(cuoc.uid, vangnhan)
              await userControl.sodu(cuoc.uid, "Thắng con số may mắn", "+" + numberWithCommas(vangnhan))
              if (vangnhan > 50000000) {
                ws.wsall(JSON.stringify({ "typechat": "2", "server": cuoc.server, "type": "BOT", "name": "Hệ thống", "noidung": cuoc.nhanvat + " vừa thắng " + numberWithCommas((vangnhan)) + " vàng" }))

              }
            }
            else {
              var user = await userControl.upMoney(cuoc.uid, 0)
              await userControl.upHanmuc(cuoc.uid, cuoc.vangdat * -1, user.server)
            }
            await Cuoc.findOneAndUpdate({ _id: cuoc._id }, { status: status, ketqua: ketquazz, vangnhan: vangnhan });
          }
          else {

            await userControl.upMoney(cuoc.uid, cuoc.vangdat)
            await userControl.sodu(cuoc.uid, "Hoàn tiền con số may mắn ", "+" + numberWithCommas(Math.round(cuoc.vangdat)))
            await Cuoc.findOneAndUpdate({ _id: cuoc._id }, { status: 2, ketqua: 0, vangnhan: 0 });
          }

        })


        // for (let i = 0; i < cuocs.length; i++) {

        // }


        const Newgame = new Gamez({ server: server, ketquatruoc: ketquazz, time: time, timeCsmm: timecsmm })
        try {

          const savedgame = await Newgame.save()
        }
        catch (err) { }
      }
      else {

        let updateTime = await Gamez.findByIdAndUpdate(phienChay._id, { time: time });
        //console.log(updateTime)
      }

    } catch { }


    SetRunFalse(server)
  }

}

class Game {
  getTime() {
    return time;
  }
  userONLINE() {
    return userOnline;
  }
  setKq(server, kq) {
    if (kq >= 0 && kq < 100 && server > 0 && server < 11) {
      if (server == 1) ketquasv1 = kq
      if (server == 2) ketquasv2 = kq
      if (server == 3) ketquasv3 = kq
     
    }


  }
  async getTopClan() {
    const topclans = await Clan.find({}).sort({ thanhtich: -1 }).limit(7)
    const checkUserClan = await User.find({ "clan": { "$ne": 0 } })



    var strclan = "";
    var indexTop = 1;
    topclans.forEach(element => {

      var giaithuong = "";

      if (indexTop == 1) giaithuong = "500 triệu / 1 thành viên"
      else if (indexTop == 2) giaithuong = "250 triệu / 1 thành viên"
      else if (indexTop == 3) giaithuong = "100 triệu / 1 thành viên"
      else if (indexTop == 4) giaithuong = "75 triệu / 1 thành viên"
      else if (indexTop == 5) giaithuong = "50 triệu / 1 thành viên"
      else if (indexTop == 6) giaithuong = "40 triệu / 1 thành viên"
      else giaithuong = "30 triệu / 1 thành viên"


      var countMem = checkUserClan.filter(x => x.clan.id == element._id.toString()).length

      strclan += '<tr id="top' + indexTop + '"> <td  style="padding: 0"><img src="images/clan/' + element.type + '.png" style=" max-width: 40px; height: auto; padding-top: 5px" ;="" padding:="" 0;="" margin-bottom:="" 10px"="" alt=""></td>  <td style="white-space:nowrap;">' + element.name + '</td> <td style="white-space:nowrap;">' + countMem + '/25</td> <td style="white-space:nowrap;"> ' + numberWithCommas(element.thanhtich) + '</td>  <td style="white-space:nowrap;">' + giaithuong + '</td>  </tr>'
      indexTop++
    })
    return strclan
  }

  async getBxh() {
    const topUser = await User.find({}).sort({ thanhtichngay: -1 }).limit(7)
    var strclan = "";
    var indexTop = 1;
    topUser.forEach(element => {
      var giai = '';
      if (indexTop == 1) giai = "5000tr vàng";
      else if (indexTop == 2) giai = "2000tr vàng"
      else if (indexTop == 3) giai = "1000tr vàng"
      else if (indexTop == 4) giai = "500tr vàng"
      else if (indexTop == 5) giai = "200tr vàng"
      else if (indexTop == 6) giai = "100tr vàng"
      else giai = "50tr vàng"


      giai = "5% hạn mức"
      strclan += '<tr id="top' + indexTop + '"><td style="padding: 0"><img src="images/bxh/' + indexTop + '.gif" style=" max-width: 32px; height:auto; padding: 0" alt=""></td><td style="white-space:nowrap;">' + element.server + '</td><td style="white-space:nowrap;">' + element.username + '</td><td style="white-space:nowrap;">' + numberWithCommas(element.thanhtichngay) + '</td><td style="white-space:nowrap;">' + giai + '</td></tr>'
      indexTop++
    })
    return strclan;
  }

  webSocket(wss) {

    wss.broadcast = function broadcast(msg, myclient) {

      wss.clients.forEach(function each(client) {
        if (client != myclient) {
          client.send(msg);
        }
      });
    };
    wss.on('connection', function connection(ws) {
      userOnline++
      //console.log(userOnline);
      ws.on('close', (ws) => {
        userOnline--
        //  console.log(userOnline);
      })
      ws.on('message', async function incoming(message) {

        if (Isjson(message)) {

          var obj = JSON.parse(message);

          if (obj.type === "LOGIN") {
            const username = obj.username;
            const password = obj.password;

            var taikhoanc = username.match(/([0-9]|[a-z]|[A-Z])/g);
            var matkhauc = password.match(/([0-9]|[a-z]|[A-Z])/g);
            if (taikhoanc.length != username.length) {
              return ws.send("LOGINKHONGTHANHCONG|Tài khoản không hợp lệ ");
            }
            else if (matkhauc.length != password.length) {
              return ws.send("LOGINKHONGTHANHCONG|Mật khẩu không hợp lệ ");
            }
            else if (password == undefined || username == undefined || password == null || username == null) {
              return ws.send("LOGINKHONGTHANHCONG|Vui lòng nhập đủ thông tin ");
            }
            else if (password.length < 6 || password.length > 16) {
              return ws.send("LOGINKHONGTHANHCONG|Mật khẩu không hợp lệ ");
            }
            else if (username.length < 6 || username.length > 16) {
              return ws.send("LOGINKHONGTHANHCONG|Tài khoản chỉ cho phép 6 đến 16 ký tự ");
            }
            else {
              const user = await User.findOne({ username: username })
              if (!user) return ws.send("LOGINKHONGTHANHCONG|Tài khoản hoặc mật khẩu không chính xác");
              const vaildPass = await bcrypt.compare(password, user.password)
              if (!vaildPass) return ws.send("LOGINKHONGTHANHCONG|Tài khoản hoặc mật khẩu không chính xác");
              const token = await jwt.sign({ _id: user._id, username: user.username, vang: user.vang }, process.env.TOKEN_SECRET, { expiresIn: process.env.TIME_TOKEN });
              ws.send("LOGINTHANHCONG|Đăng nhập thành công chúc bạn chơi game vui vẻ|" + token);
            }
          }
          else if (obj.type === "REG") {
            const username = obj.username;
            const password = obj.password;
            const server = obj.server;



            var taikhoanc = username.match(/([0-9]|[a-z]|[A-Z])/g);
            var matkhauc = password.match(/([0-9]|[a-z]|[A-Z])/g);
            if (taikhoanc.length != username.length) {
              return ws.send("LOGINKHONGTHANHCONG|Tài khoản không hợp lệ ");
            }
            else if (matkhauc.length != password.length) {
              return ws.send("LOGINKHONGTHANHCONG|Mật khẩu không hợp lệ ");
            }
            else if (password == undefined || username == undefined || password == null || username == null || server == undefined || server == null) {
              return ws.send("LOGINKHONGTHANHCONG|Vui lòng nhập đủ thông tin ");
            }
            else if (password.length < 6 || password.length > 16) {
              return ws.send("LOGINKHONGTHANHCONG|Mật khẩu không hợp lệ ");
            }
            else if (username.length < 6 || username.length > 16) {
              return ws.send("LOGINKHONGTHANHCONG|Tài khoản chỉ cho phép 6 đến 16 ký tự ");
            }
            else if (server != 1 && server != 2 && server != 3 && server != 4 && server != 5 && server != 6 && server != 7 && server != 8 && server != 9) {
              return ws.send("LOGINKHONGTHANHCONG|Server không hợp lệ ");
            }
            else {
              const usernameExist = await User.findOne({ username: username })
              if (usernameExist) return ws.send("LOGINKHONGTHANHCONG|Tài khoản này đã có người sử dụng.");
              const salt = await bcrypt.genSalt(10)
              const hashPassword = await bcrypt.hash(password, salt)
              const user = new User({ username: username, password: hashPassword, server: server })
              try {
                const savedUser = await user.save()
                const token = await jwt.sign({ _id: user._id, username: user.username, vang: user.vang }, process.env.TOKEN_SECRET, { expiresIn: process.env.TIME_TOKEN });
                const mess = "LOGINTHANHCONG|Đăng Ký thành công chúc bạn chơi game vui vẻ|" + token;
                return ws.send(mess);
              }
              catch (err) { return ws.send("LOGINKHONGTHANHCONG|Đã có lỗi xảy ra vui lòng thử lại."); }
            }
          }
          else if (obj.type === "GETGAME") {
            const server = obj.server;
            var record = obj.record;
            const isMe = obj.isme;
            const token = obj.token;
            record = Number(record)
            if (server == undefined || record == undefined || isMe == undefined) {
              return;
            }

            var getuser = null;
            var isLogin = false;

            try {
              const verifyed = await jwt.verify(token, process.env.TOKEN_SECRET);

              const userzzz = await User.findOne({ _id: verifyed._id }, 'vang username')

              getuser = { vang: userzzz.vang, name: userzzz.username, _id: userzzz._id }
              isLogin = true
            } catch { }

            const phienChay = await Gamez.findOne({ server: server, status: 0 })
            if (phienChay) {
              var lichsuCuoc = [];
              var ketqua = [];
              if (record > 100) {
                record = 10
              }
              if (isMe == "1" && isLogin) {
                lichsuCuoc = await Cuoc.find({ server: server, uid: getuser._id }, null, { limit: record }).sort({ 'time': -1 })

              }
              else {
                lichsuCuoc = await Cuoc.find({ server: server }, null, { limit: record }).sort({ 'time': -1 })
              }
              ketqua = await Gamez.find({ server: server }, 'ketquatruoc', { limit: 10 }).sort({ 'date': -1 })
              var result =
              {
                game: phienChay,
                cuoc: lichsuCuoc,
                user: getuser,
                ketqua: ketqua
              }
              return ws.send("GETGAME|" + JSON.stringify(result));
            }
          }
          else if (obj.type === "DATCUOC") {
            const server = obj.server;
            const gold = obj.vang;
            const value = obj.value;
            const type = obj.game;
            const token = obj.token;

            const gold2 = Number(gold);

            if (server == undefined || gold == undefined || value == undefined || type == undefined || token == undefined || server == null || gold == null || value == null || token == null) {
              return;
            }

            var getuser = null;
            var isLogin = false;

            try {
              const verifyed = await jwt.verify(token, process.env.TOKEN_SECRET);
              getuser = { vang: verifyed.vang, name: verifyed.username, _id: verifyed._id }
              isLogin = true
            } catch { }


            if (!isLogin) {
              return ws.send("DATCUOC|" + "Vui lòng đăng nhập để đặt cược");
            }
            else if (server === "" || gold === "" || value === "" || type === "" || gold2 === "") {
              return ws.send("DATCUOC|" + "Lỗi không xác định");
            }
            else {
              const user = await User.findOne({ username: getuser.name }, 'vang')
              if (isNaN(gold2)) {
                return ws.send("DATCUOC|" + "Lỗi không xác định");
              }
              else if (server != 1 && server != 2 && server != 3 && server != 4 && server != 5 && server != 6 && server != 7 && server != 8 && server != 9 && server != 10) {
                return ws.send("DATCUOC|" + "Server not found");
              }
              else if ((type == 0 || type == 4) && (value != 0 && value != 1 && value != 2 && value != 3)) {
                return ws.send("DATCUOC|" + "Vui lòng chọn lại");
              }
              else if (gold2 < 1000000) {
                return ws.send("DATCUOC|" + "Chỉ được đặt cược trên 1tr vàng");
              }
              else if (user.vang < gold2) {
                return ws.send("DATCUOC|" + "Bạn không đủ vàng để đặt cược");
              }
              else if ((type != 0 && type != 4 && type != 2)) {
                return ws.send("DATCUOC|" + "Vui lòng chọn lại");
              }
              const phienChay = await Gamez.findOne({ server: server, status: 0 })
              if (phienChay) {
                var check = await userControl.upMoney(getuser._id, -gold2)
                if (user.vang - check.vang != gold2) {
                  return ws.send("DATCUOC|" + "Có lỗi đã xảy ra");
                }
                else

                  if (!check) {
                    return ws.send("DATCUOC|" + "Có lỗi đã xảy ra");
                  }
                const addCuoc = new Cuoc({ server: server, phien: phienChay._id, vangdat: gold2, uid: getuser._id, nhanvat: getuser.name, type: type, chon: value })
                try {
                  const savedCuoc = await addCuoc.save()
                }
                catch (err) {
                  console.log(err)
                }



                if (type == 0) {
                  if (value == 0) {
                    await Gamez.updateOne({ _id: phienChay._id }, { $inc: { vangchan: gold2 } })
                  }
                  else if (value == 1) {
                    await Gamez.updateOne({ _id: phienChay._id }, { $inc: { vangle: gold2 } })
                  }
                  else if (value == 2) {
                    await Gamez.updateOne({ _id: phienChay._id }, { $inc: { vangtai: gold2 } })
                  }
                  else if (value == 3) {
                    await Gamez.updateOne({ _id: phienChay._id }, { $inc: { vangxiu: gold2 } })
                  }
                }
                else if (type == 4) {
                  if (value == 0) {
                    await Gamez.updateOne({ _id: phienChay._id }, { $inc: { vangchan: gold2, vangtai: gold2 } })
                  }
                  else if (value == 1) {
                    await Gamez.updateOne({ _id: phienChay._id }, { $inc: { vangchan: gold2, vangxiu: gold2 } })
                  }
                  else if (value == 2) {
                    await Gamez.updateOne({ _id: phienChay._id }, { $inc: { vangle: gold2, vangtai: gold2 } })
                  }
                  else if (value == 3) {
                    await Gamez.updateOne({ _id: phienChay._id }, { $inc: { vangle: gold2, vangxiu: gold2 } })
                  }
                }
                return ws.send("DATCUOC|" + "Đặt cược thành công cùng chờ kết quả nào");
              }
            }
          }
          else if (obj.type === "CHAT") {

            if (obj.token && obj.name && obj.sodu && obj.noidung) {
              //  console.log(obj)
              // const chat = await Chat.findOne({ token: obj.token })

              // if (chat) {

              wss.broadcast(JSON.stringify(obj), ws);
              //    console.log(JSON.stringify(obj))
              //  const rmchat = await Chat.findOneAndUpdate({ token: obj.token }, { token: "afmskef..;" })
              //}
            }
          }
          else if (obj.type == "admin9999999") {
            ws.send(JSON.stringify({ type: "admin9999999", useronline: userOnline }));
          }

        }
      });
    });
  }

  server24(ws) {

    ws.wsall = function wsall(msg) {

      ws.clients.forEach(function each(client) {

        client.send(msg);

      });
    };

    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      return result;
    }
    setInterval(async () => {
      try {
        var code1 = await new Gifcode({ code: makeid(6), phanthuong: Math.round(getRandomIntInclusive(500000, 3000000)) }).save()
        var code2 = await new Gifcode({ code: makeid(6), phanthuong: Math.round(getRandomIntInclusive(500000, 3000000)) }).save()
        var code3 = await new Gifcode({ code: makeid(6), phanthuong: Math.round(getRandomIntInclusive(500000, 3000000)) }).save()
        var code4 = await new Gifcode({ code: makeid(6), phanthuong: Math.round(getRandomIntInclusive(500000, 3000000)) }).save()
        var code5 = await new Gifcode({ code: makeid(6), phanthuong: Math.round(getRandomIntInclusive(500000, 3000000)) }).save()
        var noidung = "<br>Nhập code: <strong>" + code1.code + "</strong> nhận ngay " + numberWithCommas(code1.phanthuong) + " vàng<br>" +
          "Nhập code: <strong>" + code2.code + "</strong> nhận ngay " + numberWithCommas(code2.phanthuong) + " vàng<br>" +
          "Nhập code: <strong>" + code3.code + "</strong> nhận ngay " + numberWithCommas(code3.phanthuong) + " vàng<br>" +
          "Nhập code: <strong>" + code4.code + "</strong> nhận ngay " + numberWithCommas(code4.phanthuong) + " vàng<br>" +
          "Nhập code: <strong>" + code5.code + "</strong> nhận ngay " + numberWithCommas(code5.phanthuong) + " vàng<br>"
        ws.wsall(JSON.stringify({ "typechat": "1", "server": "10", "type": "BOT", "name": "ÔNG GIÀ NOEL", "noidung": noidung }))
      } catch { }
    }, 1200000)

    // setInterval(() => {
    //   try {
    //     fs.readFile('gaixinh.txt', function (err, data) {
    //       if (err) { console.log("loi") }

    //       const arr = data.toString().replace(/\r\n/g, '\n').split('\n');

    //       var noidung = '<br><img src="' + arr[getRandomIntInclusive(0, arr.length)] + '" alt="9sao.me" width="75%" height="auto"><br>Chúc anh em kênh chat chơi game vui vẻ 💓💓💓'
    //       ws.wsall(JSON.stringify({ "typechat": "1", "server": "10", "type": "BOT", "name": "👇👇👇", "noidung": noidung }))
    //     });
    //   } catch { }

    // }, 300000)


    async function Nohuuu() {
      console.log("Nổ hũ")
      var nohu = await Nohu.findOne()

      var vanghu = Math.round(Number(nohu.vanghu))
      console.log("Vàng hũ: " + vanghu)
      var nowpart = nohu.nowpart

      var vangnow = 0
      for (let i = 0; i < nowpart.length; i++) {
        vangnow += Math.round(Number(nowpart[i].vang))
      }
      console.log("Vàng phiên này: " + vangnow)

      var winer = []
      for (let i = 0; i < nowpart.length; i++) {
        if (Math.round(nowpart[i].vang) > 0) {
          try {
            var percent = Number(Math.round(nowpart[i].vang) * 100 / Math.round(Number(vangnow)))
            var vangan = Math.round(Number(vanghu * percent / 100))
            vangan = Math.round(vangan * 0.30)
            console.log("Vàng ăn: " + vangan)
            if (vangan < 0) {
              vangan = vangan * -1
            }

            await userControl.upMoney(new ObjectId(nowpart[i].uid), Number(vangan))
            await userControl.sodu(new ObjectId(nowpart[i].uid), "Bạn bị bom nổ", "+" + numberWithCommas(vangan))
            winer.push({ name: nowpart[i].name, vangthang: vangan })


          } catch { }
        }
      }
      await Nohu.findOneAndUpdate({}, { vanghu: 0, nowpart: [], lastwin: winer })
      console.log("XOng")
      //await Nohu.findOneAndUpdate({}, { nowpart: [] })
    }




    setInterval(() => {
      if (time > 0) {
        time--
      }
      if (time <= 0 && !timewait) {
        timewait = true

        setTimeout(async() => {
          kqs =
            [{ server: 1, kq: (ketquasv1 == -1 ? Math.round(getRandomIntInclusive(0, 99)) : ketquasv1) },
            { server: 2, kq: (ketquasv2 == -1 ? Math.round(getRandomIntInclusive(0, 99)) : ketquasv2) },
            { server: 3, kq: (ketquasv3 == -1 ? Math.round(getRandomIntInclusive(0, 99)) : ketquasv3) }]
          time = 125
          timewait = false
          ketquasv1 = -1;
          ketquasv2 = -1;
          ketquasv3 = -1;
          if ( kqs[0].kq == 99 || kqs[0].kq == 0) {
            await Nohuuu()
          }
          await Nohu.findOneAndUpdate({}, { nowpart: [] })

        }, 5000)

      }

    }, 1000)


    setInterval(() => {

      chayGame(3, ws)
      chayGame(2, ws)
      chayGame(1, ws)

    }, 5000)
  }
}
module.exports = new Game