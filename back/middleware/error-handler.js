const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  
  console.log('in error')
  let customError = {
    // set default (if customerrorAPI was invoked use it)
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg : err.message || 'something went wrong try again'
  }
  // console.log(err.name)
  // // console.log(err.message)
  // console.log(err.keyValue)
  // if (err.message.includes('dup key')) {
  //   console.log("This word is here")
  // }

  if (err.name === 'ValidationError') {
    // getting the "main" barnches (email,name password for example)
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customError.statusCode = 400
  }

  // handeling the duplicate error
  if(err.code && err.code === 11000){
  // finding out who called 
    const duplicate = Object.keys(err.keyValue)[0]

    if(duplicate == 'credit_card_no'){
      customError.msg = `duplicate value enterd for credit card please choose a diffrent value`
      customError.statusCode = 400
    }
    if(duplicate == 'phone_no'){
      customError.msg = `duplicate value enterd for phone please choose a diffrent value`
      customError.statusCode = 400
    }
    console.log('duplicate')
  }

  // handeling the cast error
  if(err.name === 'CastError'){
    customError.msg = `no item found with id${err.value}`
    customError.statusCode = 404
  }

  console.log(customError)
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({msg: customError.msg })

}

module.exports = errorHandlerMiddleware
