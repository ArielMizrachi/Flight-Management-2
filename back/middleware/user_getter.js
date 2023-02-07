const JWT = require('jsonwebtoken')

const UserGetter = async (req,res,next) =>{
   
    const auth_header = req.headers.authorization
    const token = auth_header.split(' ')[1]

        req.user =  JWT.verify(token , process.env.JWT_SECRET)
        next()
    }

module.exports = UserGetter