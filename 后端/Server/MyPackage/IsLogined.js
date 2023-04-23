function IsLogined(req,res,next){
   if(req.headers.Authorization){
    jwt.verify(req.headers.Authorization, secretKey, (err, decoded) => {
        if (err) {
          console.log('JWT verification failed:', err.message);
        } else {
          req.user=decoded;
        }
      });
     next()
   }
   else{
    res.json({
        IsLogin:false,
        msg:"你还没有登录请登录"
    })
   }
}
module.exports={
  IsLogined:IsLogined
}

// 判断用户是否已经登录