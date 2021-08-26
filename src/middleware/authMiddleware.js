const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    try{
        req.user = jwt.sign(req.body.token, process.env.SECRETE_TOKEN)
    }
    catch(err){
        req.tokenErr = err
    }
}