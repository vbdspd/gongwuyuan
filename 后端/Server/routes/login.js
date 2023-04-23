var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")/* POST Login page. */
const mysql = require('../mysql/connect');


const connection = mysql.connection//引入连接好的数据库


// 验证密码是否正确
function passwordIscorrect(req, res, next) {
  const { username, password } = req.body;
  const sql = `select * from user where username='${username}'`
  connection.query(sql, (err, data) => {
    if (err) {
      console.log(err)
    }
    else {
      if (data.length == 0) {
        res.json({
          success: false,
          msg: "用户名或者密码错误"
        })
      }
      else {
        bcrypt.compare(password, data[0]['password'], (err, res1) => {
          if (err) {
            console.log(err)
          }
          else if (res1) {
            req.username = username
            next()
          }
          else {
            res.json({
              success: false,
              msg: "用户名或者密码错误"
            })
          }
        })
      }
    }
  })
}


const expiresIn = '1h';//token有效时间

//验证成功后生成token用于身份验证
function generateToken(req, res) {
  const user = {
    username: req.username
  }
  const my_secret = 'my_secret_pd';
  const token = jwt.sign(user, my_secret, { expiresIn: expiresIn })//生成token并且设置有效时间
  

  const sql=`select positionID from useradd where username='${user.username}' `
  connection.query(sql,(err,data)=>{
    if(err){
      console.log(err)
    }
    else{
      res.json({
        success: "ok",
        authorization: token,
        data:{
          data
        }
      })
    }
  })
  console.log('aa')
  
}

router.post("/login", passwordIscorrect, generateToken)

module.exports = router;