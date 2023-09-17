const jwt = require('jsonwebtoken');

module.exports = (req , res , next)=>{
 // verify return a token decoded and verified  otherwise , decode return the token decoded only 
 // the token is encoded but not crypted 
    try{
        const token  = req.headers.autorization.split(" ")[1] ;
       // console.log(token);
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        req.userData = decoded ; 
        next();
    }catch (error) {
        return res.status(401).json({
            message : "Auth Field"
        })

    }

};     