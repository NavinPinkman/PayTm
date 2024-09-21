const JWT_KEY = require("./config");
const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const authheader = req.headers.authorization;

    if(!authheader || !authheader.startsWith('Bearer ')){
        return res.status(403).json({
            message : "Authentication failed"
        })
    }

    const authtoken = authheader.split(' ')[1];

    try{
        const decoded = jwt.verify(authtoken,JWT_KEY)
        if(decoded){
            req.userId = decoded.userId
            next();
        }else{
            res.status(403).json({})
        }
    }
    catch(e){
        res.status(403).json({})
    }
    
}

module.exports=authMiddleware