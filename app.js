const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');


const connect = require('./utils/connection');
const getUsernameID = require('./middleware/usernameID')
const {
    authenticateRoute,
    isNotAuthenticated
} = require('./middleware/authToken')

const {
    port
} = require('./config')

const {
    login,
    signup,
    logout
} = require('./controllers/authRouter')

const homeRouter = require('./controllers/homeRouter')


const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

app.get('/login', isNotAuthenticated, function (req, res, next) {
    res.render('login', {
        err_msg: ''
    });
});

app.post('/login', login)

app.get('/sign-up', function (req, res, next) {
    res.render('register', {
        err_msg: ''
    });
})

app.post('/sign-up', signup)

app.get('/', isNotAuthenticated, function (req, res, next) {
    res.render('index');
})

app.use('/home', authenticateRoute, getUsernameID, homeRouter);

app.get('/logout', logout)


app.get('*', function (req, res) {
    res.sendStatus(404);
});
const start = async () => {
    try {
        await connect;
        app.listen(port, console.log(`Server is listening on port ${port}....`))

    } catch (error) {
        console.log(error);
    };
}

start();