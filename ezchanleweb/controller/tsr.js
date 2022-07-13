const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

module.exports = function TheSieuRe(Magd) {
    return new Promise(resolve => {
        try{
        request.get('https://thesieure.com/account/login', function (error, response, body) {
           // if (error) throw error; 
            if(error) { return resolve("loi") }
            if (response.statusCode == 200) {
                const $ = cheerio.load(body);
                var token = $('[name=_token]').val()
                const cj = request.jar();
                for (var i = 0; i < response.headers['set-cookie'].length; i++) {
                    cj.setCookie(response.headers['set-cookie'][i], 'https://thesieure.com/');
                }
                const options = {
                    url: 'https://thesieure.com/account/login',
                    jar: cj,
                    json: true,
                    body: {
                        _token: token,
                        phoneOrEmail: 'thuc22',
                        password: "thuc6633"
                    }
                };
                request.post(options, (error, res, body) => {
              //      if (error) throw error; 
                    if(error) { return resolve("loi")}
                    if (res.statusCode == 302) {
                        request.get({ url: 'https://thesieure.com/wallet/transfer', jar: cj }, function (error, response, body) {
                         //   if (error) throw error;
                            //  console.log(body)
                            const $ = cheerio.load(body, {
                                normalizeWhitespace: true,
                                xmlMode: true
                            });
                            cheerioTableparser($);
                            var data = $(".col-sm-12.table-responsive").parsetable(true, true, true);
                            try {
                                for (var i = 1; i < data[0].length; i++) {
                                    var magd = data[0][i];
                                    var sotien = data[1][i];
                                    var ten = data[2][i];
                                    var time = data[3][i];
                                    var status = data[4][i];
                                    var noidung = data[5][i];
                                    sotien = Number(sotien.replace(/,/g, '').replace("đ", ''))
                                  //  console.log(magd+"|"+Magd+"|"+sotien)
                                    if (sotien > 0 && Magd == magd)
                                    {
                                        return resolve(({ magd: magd, sotien: sotien, ten: ten, time: time, status: status, noidung: noidung }))

                                    }
                                }
                                return resolve("null")
                            } catch {return resolve("loi")}
                        });
                    }
                    else
                    return  resolve("loi")
                });
            }else return resolve("loi")
        });
    }catch{return resolve("loi")}
      
    });
    
}

// async function f1() {
//     var x = await TheSieuRe('T61013AE8885BD');
//     console.log(x); // 10
// }

// f1();