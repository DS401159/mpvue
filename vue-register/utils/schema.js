

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const users_schema = new Schema({
    username:String,
    nickname:String,
    mobile:String,
    password:String,
    dbpwd:String,
    avatar:String
});

exports.User = mongoose.model("user", users_schema);



const home_goods_schema = new Schema({
    Id:String,
    ShopPrice:Number,
    Unit:String,
    Image:Object
})
exports.Home = mongoose.model("home",home_goods_schema);
const goodsdetail_schema = new Schema({
    Id:String,
    ShopPrice:Number,
    Unit:String,
    Image:Object
})
exports.Goodsdetail = mongoose.model("goodsdetail",goodsdetail_schema);
const goodstypes_schema = new Schema({
    Id:String,
    Name:String,
    Child:Object,
})
exports.Goodstype = mongoose.model("goodstype",goodstypes_schema);
const cart_schema = new Schema({
    buyNum:Number,
    username:String,
    goodsId:String,
    goodsName:String,
    goodsImg:Object,
    goodsPrice:Number
})
exports.Cart = mongoose.model("cart",cart_schema);
const goods_schema = new Schema({
    Id:String,
    ShopPrice:Number,
    Unit:String,
    Image:Object
})
exports.Good = mongoose.model("good",goods_schema);