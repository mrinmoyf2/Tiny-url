const {v4: uuidv4} = require('uuid')
const User = require('../model/user')
const { setUser } = require('../service/auth')

async function handleUserSignup(req , res){
    const {name, email , password} = req.body
    await User.create({
        name, 
        email, 
        password,
    }).then(async () => {
        const user = await User.findOne({
            email,
            password
        })
        const token = setUser(user)
        res.cookie("uid", token)
    })
    return res.render('home');
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

    // const sessionId = uuidv4()
    // To store this sessionID with this user object , we create a function in service
    const token = setUser(user)
    res.cookie("uid", token)
    return res.redirect('/')
}

async function handelUserLogOut(req, res){
    res.clearCookie('uid'); 
    res.redirect('/login');
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handelUserLogOut
}