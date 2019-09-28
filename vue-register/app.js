const express = require("express");
const port = 2001;
const hostname = "0.0.0.0";
// const http = require("http");
const app = express();
// const server = http.createServer(app);
const connection = require("./utils/db");

//https 修改
const http = require("http");
var https = require('https');
var fs = require("fs");
// 第一步：https
var privateKey  = fs.readFileSync('./cert/ding.key', 'utf8');  
var certificate = fs.readFileSync('./cert/ding.pem', 'utf8');  
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials,app);
var httpServer = http.createServer(app)



const  cors = require("cors");
app.use(cors());
app.use(express.json());     // from-data 
app.use(express.urlencoded({ extended: false }));   // x-www-form-urlencoded  获取 POST 请求 获取 参数数据
app.use(express.static("public"));

const session = require("express-session");
app.use(session({
    secret:"test",
    name:"appTest",
    cookie:{maxAge:60*60*1000},
    resave:false,
    saveUninitialized:true
}))
const {checkToken} = require("./utils");
app.use(checkToken)
const vue = require("./vue");
app.use("/vue",vue);


// https起服务
httpsServer.listen(port,hostname,()=>{
    console.log(`my api server is running  at https://${hostname}:${port}`)
})

//http起服务
// httpServer.listen(port,hostname,()=>{
//     console.log(`my api server is running  at http://${hostname}:${port}`)
// })