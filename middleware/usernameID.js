const {
    parseJwt
} = require('../middleware/authToken');
const user = require('../models/user')

const getUsernameID = async function (req, res, next) {
    const username = parseJwt(req.cookies['id']).username;
    if (res.get('username') && res.get('id')) {
        next();
    }
    res.set({
        'username': username
    })
    const id = await user.getUserID(username);
    res.set({
        'id': id[0].user_id
    })
    next();
}

module.exports = getUsernameID;