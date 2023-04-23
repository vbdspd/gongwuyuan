var express = require('express');
var router = express.Router();
const mysql = require('../mysql/connect');


const connection = mysql.connection//引入连接好的数据库

//根据用户信息获取职位信 息
function getPostions(req, res, next) {
   console.log(req.query)
   const {major, education, political_status, minimum_working_years, grassroots_experience } = req.query;
  
   const sql = `
  SELECT * FROM positions
  WHERE (major LIKE '%${major[0]}%' OR major LIKE '%${major[1]}%' or major='无限制')
    AND (education LIKE '%${education}%')
    AND (political_status = '无限制' OR political_status = '不限' OR political_status LIKE '%${political_status}%')
    AND (minimum_working_years = '无限制' OR minimum_working_years LIKE '%${minimum_working_years}%')
    AND (grassroots_experience = '无限制' or grassroots_experience LIKE '%${grassroots_experience}%')
`.replace(/\s+/g, ' ');
  
   // `AND (grassroots_experience = '无限制' or grassroots_experience LIKE '%${grassroots_experience}%') `

   connection.query(sql, (err, data) => {
      if (err) {
         console.log(err)
      } else {
         res.json({
            sucess: true,
            data
         })
      }
   })
}
router.get('/getPostions', getPostions)

module.exports = router