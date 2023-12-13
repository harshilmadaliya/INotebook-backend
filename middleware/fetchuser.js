const jwt = require('jsonwebtoken');
const JWT_SEC = process.env.JWT_SEC

// JWT_SEC = JWT_SEC

const  fetchuser = (req,res,next)=>{

    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "please a enter a velid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SEC)
        req.user = data.user
        next()
        
    } catch (error) {
        
        res.status(401).send({error : "please a enter a velid token"})
    }
}


module.exports = fetchuser;