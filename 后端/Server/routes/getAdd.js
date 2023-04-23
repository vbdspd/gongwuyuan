var express = require('express');
var router = express.Router();
var authenticateJWT = require("../MyPackage/authenticateJWT")
const mysql = require('../mysql/connect');


const connection = mysql.connection//引入连接好的数据库

router.get("/getAdd", authenticateJWT, function (req, res) {
    const sql = `select positionID from useradd where username='${req.user}' `
    connection.query(sql, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json({
                data:data
            })
        }
    })


})

module.exports = router