const User = require('../models/User')
const Card = require('../models/Card')
const Tsr = require('../models/Tsr')
const Momo = require('../models/Momo')
const CuocMomo = require('../models/CuocMomo')
const Cuoctsr = require('../models/Cuoctsr')
const ChietKhau = require('../models/ChietKhau')
const Setting = require('../models/Setting')
const userControl = require('../controller/userControl')
const moment = require('moment')
const Vongquay = require('../models/Vongquay')
const fs = require('fs');
const request = require('request');
const TelegramBot = require('node-telegram-bot-api');

// const token = '1978990714:AAHiZ2fF6r2UHsKpri-ig8Nwk-K-KspauOE';
// const bot = new TelegramBot(token, { polling: true });

const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');



// bot.sendMessage(1500998146, "<b>ccccc</b>");



// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     console.log(chatId)
// });




function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



class Game {


    GameStart() {






        function sumNumber(str) {
            var sum = 0;
            for (var i = 0; i < str.length; i++) {
                sum += Number(str[i])
            }
            return sum;
        }
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
        }



        //Load()
        async function Load() {
            fs.readFile('nhanvat.txt', async function (err, data) {
                if (err) { console.log("loi") }
                const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
                for (let i = 0; i < arr.length; i++) {
                    const newLs = User({ username: arr[i], password: "ccc", server: 1, })
                    const Lsnew = await newLs.save();
                }


            })
        }


        getMomo()
        async function getMomo() {
            const momo = await Momo.find({})
            try {
                const setting = await Setting.findOne({ setting: "setting" })
                // request.get('https://8sao.club/api/momo/momo.php?getlsgd', function (error, response, body) {
                //  request.get('http://45.77.246.137:5555/getgd?sdt=0348780382', function (error, response, body) {
                request.get('http://momo.cltxvip.com/getgd?sdt=' + setting.naptien.momo.sdt, function (error, response, body) {
                    if (error) { console.log("loi momo");console.log(error); return; }
                    try {
                        var json = JSON.parse(body)

                        if (json) {
                            json.forEach(async (item) => {

                                var io = item.io
                                if (io == 1) {
                                    var magdz = item.magd
                                    var sotien = item.sotien
                                    var name = item.name


                                    var noidung = item.noidung
                                    if (noidung != null) {
                                        noidung = item.noidung.toLowerCase()

                                    }
                                    var sdt = item.sdtchuyen

                                    const result = momo.find(({ magd }) => magd === magdz.toString());

                                    if (!result) {

                                        const user = await User.findOne({ username: noidung });
                                        if (user) {
                                            const chietkhau = await ChietKhau.findOne({ server: user.server })

                                            const thucnhan = (sotien * chietkhau.vi) + (sotien >= 50000 ? getRandomIntInclusive(2000000, 10000000) : 0);
                                            const checkmm = await Momo.findOne({ magd: magdz })
                                            if (!checkmm) {
                                                const momooooo = await new Momo({ magd: magdz, name: name, sdt: sdt, sotien: sotien, thucnhan: thucnhan, status: "Thành công", uid: user._id }).save()
                                                if (momooooo) {
                                                    var ccc = await userControl.upMoney(user._id, thucnhan);
                                                    const caaaa = await userControl.topup(user._id, sotien)

                                                    var ccc = await userControl.sodu(user._id, '+' + numberWithCommas(thucnhan), "Nạp từ ví Momo");
                                                    const ccccc = await userControl.upKimcuong(user._id, sotien / setting.tile.kimcuong)
                                                }
                                            }
                                        }
                                    }
                                }


                            })
                        }
                    } catch { }
                })
            } catch { }
            setTimeout(function () {
                getMomo()
            }, 10000)
        }

        function thai() {


            setTimeout(function () {
                try {
                    fs.readFile('nhanvat.txt', async function (err, data) {
                        if (err) { console.log("loi") }
                        const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
                        var nhanvat = arr[getRandomIntInclusive(0, arr.length - 1)]
                        var giai = cc[getRandomIntInclusive(0, cc.length - 1)]
                        const newLs = Vongquay({ phanthuong: giai, uid: 789, name: nhanvat.toLowerCase() })
                        const Lsnew = await newLs.save();
                        thai();
                    })
                } catch { }
            }, 300000 + getRandomIntInclusive(1000, 300000))
            var cc = ["50 triệu vàng", "10 triệu vàng", "2 -> 9 triệu", "100 triệu vàng", "250 triệu vàng", "500 triệu vàng", "1 tỷ vàng"]


        }



        thai()



    }
    async getcountusers() {
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
        const count = await User.countDocuments({ date: { $gte: new Date(today), $lte: new Date(tomorrow) } })
        return count
    }
    async sumCard() {
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
        const sum = await Card.aggregate([{
            $match: { time: { $gte: new Date(today), $lt: new Date(tomorrow) }, status: 1 },
        }, {
            $group: {
                _id: null,
                tongcard: {
                    $sum: "$menhgia"
                },
                tongreal: {
                    $sum: "$amount"
                }
            }
        }])
        return sum[0]
    }
    async sumTsr() {
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
        const sum = await Tsr.aggregate([{
            $match: { time: { $gte: new Date(today), $lt: new Date(tomorrow) } },
        }, {
            $group: {
                _id: null,
                sotien: {
                    $sum: "$sotien"
                },

            }
        }])
        return sum[0]
    }

    async sumMomo() {
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
        const sum = await Momo.aggregate([{
            $match: { time: { $gte: new Date(today), $lt: new Date(tomorrow) } },
        }, {
            $group: {
                _id: null,
                sotien: {
                    $sum: "$sotien"
                },

            }
        }])
        return sum[0]
    }
    async sumMomoThang() {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
        const sum = await Momo.aggregate([{
            $match: { time: { $gte: new Date(startOfMonth), $lt: new Date(endOfMonth) } },
        }, {
            $group: {
                _id: null,
                sotien: {
                    $sum: "$sotien"
                },

            }
        }])
        return sum[0]
    }
    async sumCardThang() {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');

        const sum = await Card.aggregate([{
            $match: { time: { $gte: new Date(startOfMonth), $lt: new Date(endOfMonth) }, status: 1 },
        }, {
            $group: {
                _id: null,
                tongcard: {
                    $sum: "$menhgia"
                },
                tongreal: {
                    $sum: "$amount"
                }
            }
        }])
        return sum[0]
    }

    async sumTsrThang() {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD[T00:00:00.000Z]');
        const sum = await Tsr.aggregate([{
            $match: { time: { $gte: new Date(startOfMonth), $lt: new Date(endOfMonth) } },
        }, {
            $group: {
                _id: null,
                sotien: {
                    $sum: "$sotien"
                },

            }
        }])
        return sum[0]
    }

    async sumThangmm() {
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
        const sum = await CuocMomo.aggregate([{
            $match: { time: { $gte: new Date(today), $lt: new Date(tomorrow) }, status: 1 },
        }, {
            $group: {
                _id: null,
                tienthang: {
                    $sum: "$tienthang"
                },

            }
        }])
        return sum[0]
    }
    async sumThuamm() {
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
        const sum = await CuocMomo.aggregate([{
            $match: { time: { $gte: new Date(today), $lt: new Date(tomorrow) } },
        }, {
            $group: {
                _id: null,
                tiencuoc: {
                    $sum: "$tiencuoc"
                },

            }
        }])
        return sum[0]
    }








    async sumthangtsrclmm() {
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
        const sum = await Cuoctsr.aggregate([{
            $match: { time: { $gte: new Date(today), $lt: new Date(tomorrow) }, status: 1, $or: [{ noidung: "c" }, { noidung: "C" }, { noidung: "C" }, { noidung: "L" }, { noidung: "t" }, { noidung: "T" }, { noidung: "x" }, { noidung: "X" }, { noidung: "c2" }, { noidung: "C2" }, { noidung: "l2" }, { noidung: "L2" }, { noidung: "n1" }, { noidung: "N1" }, { noidung: "N2" }, { noidung: "n2" }, { noidung: "n3" }, { noidung: "N3" }] },
        }, {
            $group: {
                _id: null,
                tienthang: {
                    $sum: "$tienthang"
                },

            }
        }])
        return sum[0]
    }
    async sumTsrclmm() {
        var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');


        const sum = await Cuoctsr.aggregate([{
            $match: { time: { $gte: new Date(today), $lt: new Date(tomorrow) }, tiencuoc: { $gte: 0 }, $or: [{ noidung: "c" }, { noidung: "C" }, { noidung: "C" }, { noidung: "L" }, { noidung: "t" }, { noidung: "T" }, { noidung: "x" }, { noidung: "X" }, { noidung: "c2" }, { noidung: "C2" }, { noidung: "l2" }, { noidung: "L2" }, { noidung: "n1" }, { noidung: "N1" }, { noidung: "N2" }, { noidung: "n2" }, { noidung: "n3" }, { noidung: "N3" }] },
        }, {
            $group: {
                _id: null,
                tiencuoc: {
                    $sum: "$tiencuoc"
                },

            }
        }])
        return sum[0]
    }







}
module.exports = new Game
