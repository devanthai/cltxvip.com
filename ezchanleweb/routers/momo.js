const router = require('express').Router()
const checklogin = require('.././Middleware/checklogin');
const CuocMomo = require('.././models/CuocMomo');

router.get('/',checklogin,(req,res)=>{
    res.render('index',{page:"pages/momo",data: req.user})
})
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
router.post('/getls',async(req,res)=>{
    const thai = await CuocMomo.find({status:1}).sort({ 'time': -1}).limit(10)

    var html = "";
    thai.forEach((item)=>{

        var trochoi="";

        if(item.noidung=="C" || item.noidung=="L"||item.noidung=="c" || item.noidung=="l")
        {
            trochoi = "Chẵn Lẻ"
        }
        else if(item.noidung=="C2" || item.noidung=="L2"||item.noidung=="c2" || item.noidung=="l2")
        {
            trochoi = "Chẵn Lẻ 2"
        }
        else if(item.noidung=="X" || item.noidung=="T"||item.noidung=="x" || item.noidung=="t")
        {
            trochoi = "Tài Xỉu"
        }
        else if(item.noidung=="G3"||item.noidung=="g3")
        {
            trochoi = "Gấp 3"
        }
        else if(item.noidung=="S"||item.noidung=="s")
        {
            trochoi = "Tổng 3 số"
        }
        else if(item.noidung=="N1"||item.noidung=="N2"||item.noidung=="N3"||item.noidung=="n1"||item.noidung=="n2"||item.noidung=="n3")
        {
            trochoi = "1 Phần 3"
        }
        html +='<tr><td>'+new Date(item.time).toLocaleString()+'</td><td>'+ item.sdt.substring(0, item.sdt.length - 3)+"***"+'</td><td>'+numberWithCommas(item.tiencuoc)+' VNĐ</td><td>'+numberWithCommas(Math.round(item.tienthang))+' VNĐ</td><td>'+trochoi+'</td><td>'+item.noidung+'</td><td>'+'<div class="badge badge-success text-uppercase font-weight-bold" ;="" style="padding: 5px 5px"> Đã thanh toán </div></td></tr>'
    })
    res.send(html)
})
module.exports = router
