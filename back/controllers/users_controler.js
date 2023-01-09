
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, NotFoundError } = require('../errors')


// getting all of the users
const GetUsers = async (req,res) => {
    const ulist = []
    const all_users = await User.find({})
    // getting all of the user in a certain format (the serializer i in the model)
    all_users.map(user => { ulist.push(user.UserSerializer()) })

    res.status(StatusCodes.OK).json(ulist)
}


// getting just one user
const GetOneUser = async (req,res) => {

  // fine the user
    const id = req.params.id
    const chk_user = await User.findOne({user_id: id})
      if (!chk_user) {
        throw new NotFoundError(`No User with id: ${id}`)
      }
    const one_user = chk_user.UserSerializer()
      res.status(StatusCodes.OK).json( one_user )
}


// getting usernames
const GetUserName = async (req,res) => {
  const ulist = []
  const all_users = await User.find({})
  all_users.map(user => { ulist.push(user.username) })

  res.status(StatusCodes.OK).json(ulist)
}


// add a new user 
const RegisterUser = async (req,res) => {
    const new_user = await User.create(req.body)
    res.send(new_user)
}


const UpdateUser = async (req,res) => {
  
    const user_id = req.params.id
    const updated_user = await User.findOneAndUpdate({user_id: user_id},
                                                      req.body,
                                                     {new:true,runValidators:true})
    if (!updated_user) {
         throw new NotFoundError(`No user with id ${user_id}`)
    }   
    res.status(StatusCodes.OK).json({ updated_user })                                     
}


// delete a user
const DeleteUser = async (req,res) => {

    const id = req.params.id
    const deleted_user = await User.findOneAndRemove({user_id:id})
    if (!deleted_user) {
        throw new NotFoundError(`No user with id ${id}`)
    }   
    res.status(StatusCodes.OK).send('done')    

}

module.exports={
    GetUsers,
    GetOneUser,
    RegisterUser,
    DeleteUser,
    UpdateUser,
    GetUserName,
}