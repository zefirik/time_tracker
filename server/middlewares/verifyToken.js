


module.exports.verifyToken = (req, res, next) => {
    //console.log(req.headers);
    const { authorization} = req.headers;
   
    if(typeof authorization === 'undefined') {
      return res.sendStatus(403);
    }
    const bearer = authorization.split(' ');
  
    const bearerToken = bearer[1];
  
    req.token = bearerToken;
    next();
  }
