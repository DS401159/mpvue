

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const users_schema = new Schema({
    username:String,
    nickname:String,
    mobile:String,
    avatar:String
});

exports.User = mongoose.model("user", users_schema);

var schema_theme=new Schema({
    username:String,
    img:String,
    word:String,
    avatar:String,
    title:String,
    time:String,
    count:Number,
    adress:Object,
    
    choucang:Number
})

var theme=mongoose.model('theme',schema_theme)
exports.Theme=theme


var schema_comment=new Schema({
    themeid:String,
    username:String,
    word:String,
    time:String,
    avatar:String
})

var comment=mongoose.model('comment',schema_comment)
exports.Comment=comment