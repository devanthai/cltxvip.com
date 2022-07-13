const router = require('express').Router()

const authRoute = require('./auth');
const posts = require('./posts');
const game = require('./gameApi');
const napthe = require('./napthe');
const napvang = require('./vang/napvang');
const napthoi = require('./vang/napthoi');
const rutvang = require('./vang/rutvang');
const checkid = require('./vang/checkid');


router.use('/user',authRoute)
router.use('/posts',posts)  
router.use('/game',game)  
router.use('/napthe',napthe)  
router.use('/napvang',napvang)  
router.use('/napthoi',napthoi)  
router.use('/rutvang',rutvang)  
router.use('/checkid',checkid)  

router.get('/',(req,res)=>{
    res.send("API")
})  


module.exports = router