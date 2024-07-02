const jwt = require('jsonwebtoken')
const secret = "P5_d6_$^0207024@"
// const sessionIDToUserMap = new Map()
// THe problem is that , after restart the server we lost the ids from the map. so we got the invalid id of user

function setUser(user){
    // sessionIDToUserMap.set(id , user)
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secret
    )
}

function getUser(token){
    if(!token) return  null
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
}