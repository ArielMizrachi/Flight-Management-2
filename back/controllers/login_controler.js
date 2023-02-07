const JWT = require('jsonwebtoken')
const {BadRequestError} = require('../errors')
const User = require('../models/User')

const Login = async (req,res) =>{

    // getting the username and passowrd
    const username = req.body.username
    const password = req.body.password

    // in case username or password are empty return error
    if (!username || !password){
    throw new BadRequestError('please provide password and username')
    }

    // searching for the user
    const my_user = await User.findOne({username: username})

    // checking if there is a username by that name
    if (!my_user){
        throw new BadRequestError('the password or username are incorrect')
    }

    // checking if the passwrod is correct
    const is_password_correct = await my_user.ComparePassword(password)
    if(!is_password_correct){
        throw new BadRequestError('the password or username are incorrect')
    }
    

    // getting the othere relevent information for the token (username is above)

    const _id = my_user._id
    const user_id = my_user.user_id
    const is_staff = my_user.is_staff
    const is_superuser = my_user.is_superuser
   
    // making the token and refresh token
    const token = JWT.sign({_id,user_id,username,is_staff,is_superuser},process.env.JWT_SECRET, {expiresIn:'30d'})
    const refresh_token = JWT.sign({_id},process.env.JWT_SECRET_REFRESH, {expiresIn:'30d'})


    res.status(200).json({refresh:refresh_token ,access:token })
}

module.exports = Login
