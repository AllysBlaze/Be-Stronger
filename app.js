const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');


const connect = require('./utils/connection');

const {
    authenticateRoute
} = require('./middleware/authToken')

const {
    port
} = require('./config')

const {
    login,
    signup
} = require('./controllers/authRouter')

const homeRouter = require('./controllers/homeRouter')


const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())



app.get('/login', function (req, res, next) {
    res.render('logowanie');
});

app.post('/login', login)

app.get('/sign-up', function (req, res, next) {
    res.render('sign-up');
})

app.post('/sign-up', signup)


app.use('/home', authenticateRoute, homeRouter);


const start = async () => {
    try {
        await connect;
        app.listen(port, console.log(`Server is listening on port ${port}....`))

    } catch (error) {
        console.log(error);
    };
}

start();