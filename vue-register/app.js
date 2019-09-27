const express = require("express");
const port = 1906;
const hostname = "0.0.0.0";
const http = require("http");
const app = express();
const server = http.createServer(app);
const connection = require("./utils/db");

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
server.listen(port,hostname,()=>{
    console.log(`my api server is running  at http://${hostname}:${port}`)
})