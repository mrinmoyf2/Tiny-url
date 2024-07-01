const sessionIDToUserMap = new Map()
// THe problem is that , after restart the server we lost the ids from the map. so we got the invalid id of user

function setUser(id , user){
    sessionIDToUserMap.set(id , user)
}

function getUser(id){
    return sessionIDToUserMap.get(id)
}

module.exports = {
    setUser,
    getUser
}