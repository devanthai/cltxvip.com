const { redirect } = require('express/lib/response')

const router = require('express').Router()
router.use("/api", require('./api'))
router.use("/auth", require('./auth'))

router.use(function (req, res,next) {
    if(req.session.userId==null)
    {
        return res.redirect("/auth")
    }
    next()
})

router.use("/botvang", require('./botvang'))
router.get("/", (req, res) => {
    res.render("index", { page: "pages/home" })
})
module.exports = router