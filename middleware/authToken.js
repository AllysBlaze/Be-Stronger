const jwt = require('jsonwebtoken');
const {
    accessTokenSecret
} = require('../config')

function authenticateRoute(req, res, next) {
    var token = req.cookies['id']
    jwt.verify(token, accessTokenSecret, function (err, decoded) {
        if (decoded && decoded.access == "authenticated") {
            console.log("valid token")
            next();
        } else {
            console.log("something suspicious")
            res.redirect('/');
        }
    })
}

function isNotAuthenticated(req, res, next) {
    var token = req.cookies['id']
    jwt.verify(token, accessTokenSecret, function (err, decoded) {
        if (!decoded || decoded.access == "unauthenticated") {
            next();
        } else {
            console.log("already logged in")
            res.redirect('/home');
        }
    })
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

module.exports = {
    authenticateRoute,
    parseJwt,
    isNotAuthenticated
};