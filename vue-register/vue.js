const express = require("express");
const router = express.Router();

const {User,Theme,Comment} = require("./utils/schema");


//注册



const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/avatar');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + 'wh' + file.originalname);
    }
})

// 创建上传对象
const upload = multer({storage}).any();

// 上传头像 
router.post("/uploadAvatar", upload, (req, res) => {
    console.log("xxxx");
    console.log(req.files);
    var pic = req.files[0].path;
    var username = aesDecrypt(req.session.token, keys);
    console.log(username);

    User.updateOne(
        {
            username
        },
        {
            $set: {
                avatar: pic
            }
        }).then(result => {
        res.json({
            msg: "头像上传成功",
            code: 200,
            pic,
            result
        });
    });

});


//发表
router.post('/settheme',upload,(req,res)=>{
    var body=req.body
    img=req.files[0].path
    Theme.insertMany({
        img,
        username:body.username,
        word:body.word,
        avatar:body.avatar,
        count:body.count,
        time:body.time,
        addres:body.time,
        shoucang:body.shoucang
    },{}).then(result=>{
        res.json({
            code:200,
            msg:'发表成功',
            result
        })

    })
})

//根据话题ID进入评论列表
router.get('/gettheme',(req,res)=>{
    var {_id,username}=req.query
    var obj={}
    if(_id){
        obj._id=_id
    }
    if(username){
        obj.username=username
        obj.shoucang=shoucang
    }
    Theme.find(obj,{}).sort({_id:-1}).then(result=>{
        res.json({
            code:200,
            msg:'获取成功',
            result
        })
    })
})


//发表评论
router.post('/setcomment',(req,res)=>{
    var body=req.body
    Comment.insertMany(body).then(result=>{
        res.json({
            code:200,
            msg:'评论成功',
            result
        })
    })
})

//获取评论
router.get('/getcomment',(req,res)=>{
    var query=req.query
    Comment.find({themeid:query.themeid},{}).then(result=>{
        res.json({
            code:200,
            msg:'获取评论成功',
            result
        })
    })
})

//可以删除自己的话题
router.post('/deltheme',(req,res)=>{
    var body=req.body
    Theme.deleteOne({_id:body._id}).then(result=>{
        res.json({
            code:200,
            msg:'删除成功',
            result
        })
    })
})



module.exports = router;