var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var bcrypt = require('bcrypt')

// 解析post请求的请求体

var mysql = require('../mysql/connect')


const connection = mysql.connection;


//验证用户名是否重复
function isRepeat(req, res, next) {
    const { username } = req.body;
    const sql = `select * from user where username='${username}'`;
    connection.query(sql, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data.length !== 0) {
                res.json({
                    msg: "注册失败用户名重复",
                    success: false,
                })
            }
            else {
                next()
            }
        }
    })

}
router.post('/rigist', isRepeat, function (req, res) {
    let { username, password, phone } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    password=bcrypt.hashSync(password,salt);
    console.log(password)
    const sql = `insert into user values('${username}','${password}','${phone}')`;
    connection.query(sql, function (err, data) {
        if (err) {
            res.json({
                success: false,
                msg: "注册失败"
            })
        }
        else {
            res.json({
                success: true,
                msg: "注册成功"
            })
        }

    })
})
/* GET home page. */



module.exports = router;
