require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

      const whiteList = ['/', '/login', '/register'];
      if(whiteList.find(item => '/v1/api' + item === req.originalUrl)){
          next();
          return;
      }

      
      if(req.headers && req.headers.authorization){
        // verify token
          try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            next();
          }catch(err){
              res.status(401).json({
                  EC: 2,
                  EM: "Token is invalid"
              });
          }
      }else{
          res.status(401).json({
              EC: 1,
              EM: "Unauthorized"
          });
      }
  
  
  }
  
  module.exports = auth;