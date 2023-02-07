const JWT = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const AuthunticationMiddleware = async (req,res,next) =>{

    // check for auth bearer and return an error if there is a problem
    const auth_header = req.headers.authorization
    if (!auth_header || !auth_header.startsWith('Bearer ')) {
        return false
  }
    const token = auth_header.split(' ')[1]
    // cheack if the token is ok and if so sending a personolize message
    try {
        // adding an item to the req object for the next middleware
        req.user= JWT.verify(token , process.env.JWT_SECRET)
        next()
    }
    catch (error) {
        throw new UnauthenticatedError('not authorized') 
    }
}

module.exports = AuthunticationMiddleware