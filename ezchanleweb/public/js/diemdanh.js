
//const socketzzz = io.connect("https://"+document.domain);
var socketzzz = null
if (document.domain.includes("localhost")) {
    socketzzz = io.connect("http://localhost:8443");

}
else
{
    socketzzz = io.connect("https://"+document.domain);

}

var isRandomwin = false

socketzzz.on("pickme", (data) => {
   

   
    $("#countMuster").text((data.countPlayerDiemdanh))
    if (!isRandomwin) {
        console.log(data.lastwindiemdanh)
        var txxxdb = ""
        for (let i = 0; i < data.lastwindiemdanh.length; i++) {
            txxxdb += data.lastwindiemdanh[i].name + (i == data.lastwindiemdanh.length - 1 ? '' : ', ')
            console.log(txxxdb)
        }
        $("#winnerMuster").text(txxxdb)
    }
    setTimeCurrent(data.TimeDiemDanh)
})

socketzzz.on("datawin", (data) => {
    isRandomwin = true

    indexWin = data.length
    if (indexWin > 10) {
        indexWin = 10
    }
    randomMusterShow(data)
})

function thamgiadiemdanh() {
    $['ajax']({
        type: 'post',
        url: '/minigame/thamgiadiemdanh',
        success: function (data) {
            if (data.error == 1) {
                thongbao2(data.message, "warning")
            }
            else {
                thongbao2(data.message, "success")
            }

        }
    });
}
var indexWin = 0
function randomMusterShow(data) {

    setTimeout(() => {
        indexWin--
        if (indexWin > -1) {


            $("#winnerMuster").text(data[indexWin].name);
            randomMusterShow(data)
        }
        else {
            isRandomwin = false
        }
    }, 200)

}
function setTimeCurrent(time) {
    if (time > 0) {
        var minutes = Math.floor((time / 60) % 60);
        var seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds;
        $("#timeMuster").text(minutes + ":" + seconds + "s");
    } else {
        $("#timeMuster").text("0s");
    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}