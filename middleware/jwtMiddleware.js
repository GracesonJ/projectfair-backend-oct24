const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next)=>{
    console.log(`Inside JWT Middleware`);

    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token, 'secretKey')
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        console.log(req.payload);
        
        next() 

    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

module.exports = jwtMiddleware