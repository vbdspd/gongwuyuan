
const mysql = require('mysql')  //引入mysql 模块

module.exports={
    connection:mysql.createConnection({
        host: '47.97.22.215',
        user: 'root',
        password: '123456',
        database: 'my_db'
    })
    
}
// 测试连接

