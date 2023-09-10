const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req,res,next) => {

    //verify auth
    const { authorization } = req.headers
    console.log('auth header: ',req.headers.authorization)

    if(!authorization){
        return res.status(401).json({error: 'authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()

    } catch(error) {
        console.log(error)
        res.status(401).json({error: 'req not authorized'})
    }

}

module.exports = requireAuth