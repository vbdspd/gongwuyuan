// 把excel 中方xsl结尾的文件插入数据库 再插入书库之前你应该应该在数据库中建好相应的表


// DataBase配置形式
function insertData(path,DataBase,tableName){
    const xlsx = require('node-xlsx');
    const fs = require('fs');
    const mysql=require('mysql')
    // 读取文件数据
    const file = fs.readFileSync(path);//
    const sheets = xlsx.parse(file);
    const connection=mysql.createConnection(DataBase)
    sheets.forEach((sheet)=>{
        const rows = sheet.data
        rows.forEach((row,index) => {
            let sql=`insert into ${tableName} values (`
            for(let i=0;i<row.length;i++){
               if(i!=row.length-1){
                  sql+=`'${row[i]}',`
               }
               else{
                sql+=`${row[i]})`
               }
            }
            connection.query(sql,(err,data)=>{
                if(err){
                    console.log(err)
                }
            })
        });
    })

}
module.exports=insertData