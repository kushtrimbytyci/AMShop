const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const errorHandler = require('../helpers/errorHandler')


exports.authenticate = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        try {
            const decoded = await jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findByPk(decoded.id)
            if(!req.user){
                return next(new errorHandler('User doesnt exist',401))
            }
            next()
        } catch (error) {
            return next(new errorHandler('Not authorized to access this token',401))
        }
    }
    else{
        return next(new errorHandler('No token found',401))
    }
   
})

exports.authorize = (...roles)=>{
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next()
        }else{
            return next(new errorHandler(`Ski te drejte ti ne kete route sepse nuk je ${roles}`),403)
        }
    }
}

