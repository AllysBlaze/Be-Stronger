const {
    parseJwt
} = require('../middleware/authToken');
const user = require('../models/user')

const getUsernameID = async function (req, res, next) {
    const username = parseJwt(req.cookies['id']).username;
    if (res.get('username') && res.get('id')) {
        next();
    }

    const id = await user.getUserID(username);
    const photo = await user.getUserPhoto(id[0].user_id)
    res.set({
        'username': username,
        'id': id[0].user_id,
        'photo': photo[0].user_photo
    })
    next();
}

module.exports = getUsernameID;