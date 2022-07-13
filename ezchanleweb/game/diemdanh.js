
var Diemdanh = require("../models/Diemdanh")
const checklogin = require("../Middleware/checklogin")
const User = require("../models/User")
const Cuoc = require("../models/Cuoc")
const UserControl = require("../controller/user")

class GameLucky {
    gamestart = (io, app) => {
        function timeSince(date) {
            var seconds = Math.floor((new Date() - date) / 1000);
            return Math.floor(seconds)
        }
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        var isbaotri = false
        app.get("/minigame/ttt", (req, res) => {
            res.send("");
        })
        app.post("/minigame/thamgiadiemdanh", checklogin, async (req, res) => {
            try {
                var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

                if (isbaotri) {
                    return res.send({ error: 1, message: "Bảo trì trong giây lát" })
                }
                if (!req.user.isLogin) {
                    return res.send({ error: 1, message: "Vui lòng đăng nhập" })
                }
                if (req.session.time) {
                    if (timeSince(req.session.time) < 2) {
                        return res.send({ error: 1, message: "Thao tác quá nhanh" })
                    }
                }
                req.session.time = Date.now()
                if (PlayerDiemDanh.some(player => player.uid.toString() === req.user._id.toString())) {
                    return res.send({ error: 1, message: "Bạn đang tham gia rồi vui lòng chờ kết quả nhé" })
                }

                if (PlayerDiemDanh.some(player => player.ip === ip)) {
                    for (let i = 0; i < PlayerDiemDanh.length; i++) {

                        if (PlayerDiemDanh[i].uid.toString() != req.user._id.toString() && PlayerDiemDanh[i].ip == ip) {

                            PlayerDiemDanh.splice(i, 1);
                        }
                    }
                }
                const user = await User.findById(req.user._id)
                if (user) {

                    PlayerDiemDanh.push({ uid: req.user._id, name: user.username, ip: ip })
                    PlayerDiemDanh2.push({ name: user.username })

                    io.sockets.emit("logsdiemdanh", user.username + " đã tham gia")
                    return res.send({ error: 0, message: "Tham gia thành công cùng chờ kết quả nhé" })
                }
            } catch { }
            res.send({ error: 1, message: "Lỗi không xác định" })
        })

        io.on('connection', client => {
            var clientIp = client.request.connection.remoteAddress;
            try {

                client.on('disconnect', () => {

                });
            } catch { }
        });
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        async function traothuongdiemdanh(player) {
            try {
                var now = new Date();
                var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const cuocs = await Cuoc.countDocuments({ uid: player.uid, status: { $ne: 5 }, time: { $gte: startOfToday } })
                const user = await User.findById(player.uid)

                if (cuocs > 0 || user.thanhtichngay > 1000000 || user.topup > 5000 || user.sdt != 0) {

                    var vangthuong = getRandomIntInclusive(1000000, 6000000)
                    var kimcuong = getRandomIntInclusive(1, 6)

                    DiemDanhLastWin.push({ name: player.name })
                    await new Diemdanh({ name: player.name }).save()
                    await UserControl.upMoney(player.uid, vangthuong)
                    await UserControl.upKimcuong(player.uid, kimcuong)
                    await UserControl.sodu(player.uid, "Điểm danh", "+" + numberWithCommas(vangthuong))

                }
           } catch {
           }
        }
        setInterval(() => {
            try {
                io.sockets.emit("pickme", { lastwindiemdanh: DiemDanhLastWin, countPlayerDiemdanh: PlayerDiemDanh.length, TimeDiemDanh: TimeDiemDanh })
            } catch { }
        }, 1000)
        const TimeDiemDanhG = 900
        var TimeDiemDanh = 900
        var PlayerDiemDanh = []
        var PlayerDiemDanh2 = []
        var DiemDanhLastWin = []
        var IsPending = false
        Diemdanh.find({}).sort({ time: -1 }).limit(10).exec(function (err, last) {
            DiemDanhLastWin = last
        });
        setInterval(async() => {
            if (TimeDiemDanh > 0) {
                TimeDiemDanh--
            }

            if (TimeDiemDanh <= 0 && !IsPending) {
                IsPending = true
                
                if (PlayerDiemDanh.length > 0) {
                    console.log(PlayerDiemDanh)
                    DiemDanhLastWin = []
                    io.sockets.emit("datawin", PlayerDiemDanh2)
                    var pl1 = getRandomIntInclusive(0, PlayerDiemDanh.length - 1)
                    var pl2 = getRandomIntInclusive(0, PlayerDiemDanh.length - 1)
                    while(pl2==pl1)
                    {
                        pl2 = getRandomIntInclusive(0, PlayerDiemDanh.length - 1)
                    }
                    await traothuongdiemdanh(PlayerDiemDanh[pl1])
                    await traothuongdiemdanh(PlayerDiemDanh[pl2])

                }
                PlayerDiemDanh = []

                setTimeout(() => {
                    IsPending = false
                    TimeDiemDanh = TimeDiemDanhG
                    PlayerDiemDanh2 = []
                    PlayerDiemDanh = []
                }, 5000);

            }



        }, 1000)
    }
}
module.exports = new GameLucky