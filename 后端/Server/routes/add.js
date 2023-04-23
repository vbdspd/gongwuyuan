var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const mysql = require('../mysql/connect');
const connection = mysql.connection//引入连接好的数据库
const authenticateJWT=require("../MyPackage/authenticateJWT");




function  add(req,res,next){
  let id=Number(req.query.id)
  const sql=`insert into useradd values('${req.user}',${id})`

  const sql2=`select * from useradd where username='${req.user}' and positionID=${id}`
  connection.query(sql2,(err,data)=>{
    if(err){
        console.log(err)
    }
    else{
       if(data.length!==0){
        res.json({
          success:false
         })
       }
    }
  })
  connection.query(sql,(err,data)=>{
    if(err){
        console.log(err)
    }
    else{
       res.json({
        success:true
       })
    }
  })
}


router.get("/add",authenticateJWT,add)
module.exports = router;