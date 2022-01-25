const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database');

const bodyParser = require("body-parser");

const mustacheExpress = require('mustache-express');

const indexRouter = require('./routes/index');

const app = express();
const port = process.env.port || 5000

// view engine setup
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/', indexRouter);

app.get("/api/database/items", (req, res, next) => {
    const sql = "select * from item";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get('/api/database/clear', (req, res, next) => {
    const sql = "delete from item";

    db.run(sql, [], function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
        })
    });
})

app.post("/api/database/add-item", (req, res, next) => {
    let errors = []

    if (!req.body.width) {
        errors.push("No width specified");
    }
    if (!req.body.height) {
        errors.push("No height specified");
    }
    if (!req.body.content) {
        errors.push("No content specified");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    let data = {
        width: req.body.width,
        height: req.body.height,
        content: req.body.content
    }
    const sql = 'INSERT INTO item (width,height,content) VALUES (?,?,?)'
    const params = [data.width, data.height, data.content]

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Listen on port 'port'
app.listen(port, () => console.log(`Listening on port ${port}`))