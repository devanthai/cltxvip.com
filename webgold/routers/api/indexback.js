const router = require('express').Router()
const MbotVang = require('../../models/BotGold')

router.post("/updatebot", async (req, res) => {
    const { _id, Name, Gold, TypeBot } = req.body
    const findzzz = await MbotVang.findById(_id)
    if (!findzzz) {
        return res.send("out")
    }
    else if (Gold > 1500000000 && TypeBot == 1) {
        await MbotVang.findByIdAndUpdate({ _id: _id }, { Name: Name, Gold: Gold, Status: -1, TypeBot: 2, CodeVps: "null" })
        return res.send("out")
    }
    else if (Gold < 500000000 && TypeBot == 2) {
        await MbotVang.findByIdAndUpdate({ _id: _id }, { Name: Name, Gold: Gold, Status: -1, TypeBot: 1, CodeVps: "null" })
        return res.send("out")
    }
    const findup = await MbotVang.findByIdAndUpdate({ _id: _id }, { Name: Name, Gold: Gold, Status: 1 })
    res.send(findup._id + "|" + findup.Server + "|" + findup.Username + "|" + findup.Password + "|" + findup.ToaDoX + "|" + findup.ToaDoY + "|" + findup.Zone + "|" + findup.TypeBot)
})
router.post('/getbot', async (req, res) => {
    const MacAddress = req.body.Mac
    const Type = req.body.Type
    var findAcc = await MbotVang.find({ CodeVps: MacAddress, TypeBot: Type })
    
    var serverNo = -1
    var accFirt = null
    var accFind = await MbotVang.find({ TypeBot: Type })
    for (let z = 1; z < 10; z++) {
        const findAcccc = accFind.find(({ Server }) => Server === z);
        if(Type==2)
    {console.log(findAcccc)}
        if (!findAcccc) {
           
            
            continue
        }
       
        var iscontain = false
        var isuutien = false
        for (let i = 0; i < findAcc.length; i++) {
            if (secondSince(findAcc[i].updatedAt) > 60 && findAcc[i].CodeVps == MacAddress) {
                accFirt = findAcc[i]
                isuutien = true
                break
            }
            else if (findAcc[i].Server == z) {
                iscontain = true
                break
            }
        }
        if (isuutien) {
            break
        }
        else if (!iscontain) {
            serverNo = z;
            break;
        }
    }
    if(Type==2)
    {
        console.log(serverNo)
    }
    if (accFirt != null) {
        const setMacAcc = await MbotVang.findByIdAndUpdate(accFirt._id, { CodeVps: MacAddress })
        res.send(setMacAcc)
    }
    else if (serverNo == -1) {
        res.send("null")
    }
    else {
        var setMacAcc = await MbotVang.findOneAndUpdate({ CodeVps: "null", TypeBot: Type, Server: serverNo }, { CodeVps: MacAddress })
        if (!setMacAcc) {
            return res.send("null")
        }
        res.send(setMacAcc)
    }
})
function secondSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    return Math.floor(seconds)
}
module.exports = router
