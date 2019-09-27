const express = require("express");
const router = express.Router();

const {User, Home, Goodsdetail, Goodstype, Cart,Good} = require("./utils/schema");

const {keys, aesEncrypt, aesDecrypt} = require("./utils");
//注册

router.post("/register", (req, res) => {
    const body = req.body;
    console.log(req.body);
    User.findOne({
        $or: [
            {
                username: body.username,
            },
            {
                mobile: body.mobile
            }
        ]
    }, {}).then(result => {
        console.log(result)
        if (result) {
            res.json({
                code: 200,
                msg: "注册失败,用户名或者手机号已经存在",
                type: 0
            })
        } else {
            User.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: "注册成功...",
                    type: 1
                })
            })
        }
    })
})
//登录
router.post("/login", (req, res) => {
    const body = req.body;
    console.log(body);
    User.findOne({
        $or: [
            {
                username: body.keys,
            },
            {
                mobile: body.keys,
            }
        ]
    }, {}).then(result => {
        console.log(result)
        if (result) {
            if (result.password == body.password) {
                // token    发送给前端  
                // session  后端 
                console.log(req.session);

                const token = aesEncrypt(result.username, keys);
                req.session.token = token;

                res.json({
                    code: 200,
                    msg: "登录成功",
                    token,
                    type: 1
                })
            } else {
                res.json({
                    code: 200,
                    msg: "密码错误",
                    type: 0
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "用户名或者手机号不存在",
                type: 0
            })
        }
    })

})

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

router.post("/getAvatar", (req, res) => {
    const {username} = req.body;
    console.log(username)
    User.findOne({
        username,
    }).then(result => {
        if (result.avatar) {
            res.json({
                code: 200,
                msg: "获取个人头像成功",
                type: 1,
                avatar: result.avatar
            })
            // console.log(avatar)
        } else {
            res.json({
                code: 200,
                msg: "个人头像尚未上传",
                type: 0,
                avatar: null

            })
            // console.log(avatar)
        }
    })

});
// 获取商品分类的内容
router.get("/getGoodTypes", (req, res) => {
    Goodstype.find({},{}).then(result => {
        res.json({
            code: 200,
            msg: "获取商品分类成功",
            result
        })
        console.log(result)
    })
})
//获取首页数据
// db.goodsdetails.findOne({Id:'958294c4-32bc-4a7e-9281-58a903e7b41b'},{Id:1,infoImg:1,CarouselIamges:1,Name:1,OriginPlace:1,Stock:1,SalesVolume:1,ShopPrice:1,OrgPrice:1,Unit:1})
router.get("/getHomes", (req, res) => {
    Home.find({}).then(result => {
        res.json({
            code: 200,
            msg: "获取商品数据成功",
            result
        })
    })
});
//获取商品列表
router.get("/goods", (req, res) => {
    Good.find({}).then(result => {
        res.json({
            code: 200,
            msg: "获取商品数据成功",
            result
        })
    })
});
//获取商品详情
router.get("/getGoodDetail", (req, res) => {
    const {
        goodId
    } = req.query;

    console.log(req.query);
    Goodsdetail.findOne({
        Id: goodId
    }, {
        Id: 1,
        infoImg: 1,
        CarouselIamges: 1,
        Name: 1,
        OriginPlace: 1,
        Stock: 1,
        SalesVolume: 1,
        ShopPrice: 1,
        OrgPrice: 1,
        Unit: 1
    }).then((result) => {
        res.json({
            code: 200,
            msg: "获取商品详情数据成功",
            result
        })

    })
});
//查询是否存在,存在修改,不存在新增
router.post("/insertCart", (req, res) => {
    const {
        buyNum,
        username,
        goodsId,
        goodsName,
        goodsImg,
        goodsPrice,
        __v
    } = req.body;
    // console.log(req.body)
    Cart.findOne({
        username,goodsId
    }).then(result=>{
        if (result){
            Cart.update({
                username, goodsId
            },{
                $inc:{
                    buyNum:buyNum*1,
                },
                $set:{
                    time:Date.now()
                }
            }).then(result=>{
                res.json({
                    code:200,
                    msg:"购物车更新完成",
                    result
                })
            })

        } else {
            Cart.insertMany({
                buyNum:buyNum*1,  username,goodsId,goodsName,goodsImg,goodsPrice,__v,time:Date.now()
            }).then(result=>{
                res.json({
                    code:200,
                    msg:'购物车新增成功',
                    result,
                })
            })
        }
    })
})

//获取购物车数据
router.post("/mycart",(req,res)=>{
    const {
        username
    }=req.body
    // console.log(req.body)
    Cart.find({username},{}).sort({time:-1}).then(result=>{
        if(result){
            let total = 0;
            result.forEach(item=>{
                total+=item.buyNum*1;
            })
            res.json({
                code:200,
                msg:'获取购物车信息成功',
                carList:result,
                total
            })
        }else{
            res.json({
                code:200,
                msg:'购物车空空如也',
                carList:null
            })
        }
    })
})
//加减
router.post("/onchange",(req,res)=>{
    const {
        username,
        buyNum,
        goodsId
    }=req.body
    // console.log(req.body)
    Cart.update({username,goodsId},{$set:{buyNum}}).then(result=>{
        // if (result){
        //     let total = 0;
        // }
        res.json({
            code:200,
            msg:'购物车新增成功',
            result,
            // total
        })
    })
});
router.post('/delmycar',(req,res)=>{
    const{
        id
    }=req.body
    console.log(id)
    Cart.deleteMany({
        _id: id,
    }).then(result=>{
        res.json({
            code: 200,
            msg: '购物车删除完成',
            result,
        })

    })
})
router.post("/search",(req,res)=>{
    const {
        keyword
    }=req.body
    console.log(keyword)
    if (keyword){
        obj = {
            $or:[
                {
                    Name:new RegExp(keyword)
                }
            ]
        }

    }
    Goodsdetail.find(obj,{}).sort({
        _id:-1
    }).then(result=>{

        res.json({
            code: 200,
            msg: '查询成功',
            result,
        })
        console.log(result)
    })
})
module.exports = router;