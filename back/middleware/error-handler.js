const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  
  let customError = {
    // set default (if customerrorAPI was invoked use it)
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg : err.message || 'something went wrong try again'
  }

  if (err.name === 'ValidationError') {
    // getting the "main" barnches (email,name password for example)
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customError.statusCode = 400
  }

  // handeling the duplicate error
  if(err.code && err.code === 11000){
    customError.msg = `duplicate value enterd for ${err.keyValue.email} field, please choose a diffrent value`
    customError.statusCode = 400
  }

  // handeling the cast error
  if(err.name === 'CastError'){
    customError.msg = `no item found with id${err.value}`
    customError.statusCode = 404
  }

  // console.log(customError)
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({msg: customError.msg })

}

module.exports = errorHandlerMiddleware
