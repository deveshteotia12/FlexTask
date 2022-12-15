var jwt = require('jsonwebtoken');
const config = require('../../config/index');



 const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) throw Error('Invalid Request');
    const payload= await jwt.verify(token,config.jwtKEY);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error)
     res.json({success: false,message: 'Authentication failure'})
    
  }
};

module.exports=authMiddleware;