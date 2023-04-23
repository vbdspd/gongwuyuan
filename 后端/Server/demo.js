
const xlsx = require('node-xlsx');
const fs = require('fs');

// 读取文件数据
const file = fs.readFileSync('./data.xls');
const sheets = xlsx.parse(file);

const sheet1 = sheets[0]

const rows = sheet1.data
rows.shift().shift(); // 去掉标题行

let sql=`insert into positions VALUES `
console.log(rows[1])
rows.forEach((row) => {
     sql+=`(null,'${row[0]}', '${row[1]}', '${row[2]}', '${row[3]}', '${row[4]}', '${row[5]}', '${row[6]}', '${row[7]}', '${row[8]}', '${row[9]}', '${row[10]}', '${row[11]}', '${row[12]}', '${row[13]}', '${row[14]}', '${row[15]}', '${row[16]}', '${row[17]}', '${row[18]}', '${row[19]}', '${row[20]}', '${row[21]}', '${row[22]}', '${row[23]}', '${row[24]}', '${row[25]}','${row[26]}'),`
});


