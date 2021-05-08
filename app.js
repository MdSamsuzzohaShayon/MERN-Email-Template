require('dotenv').config({ path: "../../../.env" });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const colors = require('colors');


const conn = require('./config/mysql-config');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const emailTemplate = require('./routes/template');

const app = express();



// DATABASE CONNECTION 
/*
conn.connect((err, res) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + conn.threadId);
});
*/


// not working 



app.use(express.json({ limit: '50mb' }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
    next();
});
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'aws')));
app.use(methodOverride('_method'));
// app.use()
colors.setTheme({
    info: 'bgGreen',
    help: 'cyan',
    warn: 'yellow',
    success: 'bgBlue',
    error: 'red'
});


app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/template', emailTemplate);

// # after moving folder 



console.log("env", process.env.PORT);


// app.listen(process.env.PORT, () => console.log("Server is connected to: " + process.env.PORT.success));
app.listen(process.env.PORT, () => console.log("Server is connected to: " + process.env.PORT));
