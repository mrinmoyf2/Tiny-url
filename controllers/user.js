const {v4: uuidv4} = require('uuid')
const User = require('../model/user')
const { setUser } = require('../service/auth')

async function handleUserSignup(req , res){
    const {name, email , password} = req.body
    await User.create({
        name, 
        email, 
        password,
    })
    return res.render("/");
}

async function handleUserLogin(req , res){
    const {email , password} = req.body
    const user = await User.findOne({
        email,
        password
    })
    if(!user) return res.render('login', {
        error: 'Invalid Username or Password'
    })

    const sessionId = uuidv4()
    // To store this sessionID with this user object , we create a function in service
    setUser(sessionId, user)
    res.cookie("uid", sessionId)
    return res.redirect('/')
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}