var jwt=require("jsonwebtoken")
const secret= 'my_secret_pd';
const authenticateJWT = function(req, res, next){
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, secret, (err, user) => {
        if (err) {
          console.log(err)
          return res.sendStatus(403);
        }
        req.user = user.username;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

  module.exports=authenticateJWT