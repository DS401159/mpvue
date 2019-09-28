const express = require("express");
const port = '1901';
const hostname = "0.0.0.0";
// const http = require("http");
const app = express();
// const server = http.createServer(app);
const connection = require("./utils/db");

<<<<<<< HEAD
const cors = require("cors");
=======
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
>>>>>>> 1246c008f1af074febc61a2ea3d24f79f40cfe21
app.use(cors());
app.use(express.json());     // from-data 
app.use(express.urlencoded({ extended: false }));   // x-www-form-urlencoded  获取 POST 请求 获取 参数数据
app.use(express.static("public"));

const session = require("express-session");
app.use(session({
    secret: "test",
    name: "appTest",
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true
}))
<<<<<<< HEAD


=======
const { checkToken } = require("./utils");
app.use(checkToken)
>>>>>>> 1414ebd54fedfa0f138ae9cede70d832b1bab067
const vue = require("./vue");
<<<<<<< HEAD
app.use("/vue", vue);
server.listen(port, hostname, () => {
    console.log(`my api server is running  at http://${hostname}:${port}`)
})
=======
app.use("/vue",vue);


// https起服务
httpsServer.listen(port,hostname,()=>{
    console.log(`my api server is running  at https://${hostname}:${port}`)
})

//http起服务
// httpServer.listen(port,hostname,()=>{
//     console.log(`my api server is running  at http://${hostname}:${port}`)
// })
>>>>>>> 1246c008f1af074febc61a2ea3d24f79f40cfe21
