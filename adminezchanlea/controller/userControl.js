const schemaUser = require("../models/User");
const Sodu = require("../models/Sodu");
const Clan = require("../models/Clan");


class User {

    async upMoney(uid, money) {
       return await schemaUser.findOneAndUpdate({ _id: uid }, { $inc: { vang: money } },{new:true})
    }
    async topup(uid, money) {
        return await schemaUser.findOneAndUpdate({ _id: uid }, { $inc: { topup: money } },{new:true})
     }
    async upKimcuong(uid, kimcuong) {
        return await schemaUser.findOneAndUpdate({ _id: uid }, { $inc: { kimcuong: kimcuong } },{new:true})
     }
     async upThanhtich(uid, diem) {
        const upThanhtichday = await schemaUser.findOneAndUpdate({ _id: uid }, { $inc: { thanhtichngay: diem } })
        if(upThanhtichday.clan!=0)
        {
            const us = await schemaUser.findOneAndUpdate({ _id: uid }, { $inc: { "clan.thanhtich": diem } })
        
            const clan = await Clan.findOneAndUpdate({ _id: us.clan.id }, { $inc: { thanhtich: diem } },{new:true})
        }
        return upThanhtichday
     }
    sodu(uid, giaodich, noidung) {
        return schemaUser.findOne({ _id: uid }, function (err, data) {
            if (err) return "loi"
            if (data) {
                const newSodu = new Sodu({ noidung: noidung, giaodich: giaodich, uid: data._id, vang: Math.round( data.vang )})
                newSodu.save((err, data) => {
                    if (err) return handleError(err);
                    if (data) {
                       // console.log(data)
                     }
                })
            }
        })

    }
}
module.exports = new User

