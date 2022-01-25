const express = require('express');
const serverless = require('serverless-http');
const path = require('path');

const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const mustacheExpress = require('mustache-express');

// const db = require('./database');

const app = express();

// view engine setup
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('views', './dist/views');
app.set('view engine', 'mustache');

app.use(express.static('./dist/public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const pageRouter = require('./routes/index');
const apiRouter = require('./routes/api');

app.use('/.netlify/functions/app', pageRouter);
app.use('/.netlify/functions/api', apiRouter);

// app.get("/.netlify/functions/api/database/items", (req, res, next) => {
//     const sql = "select * from item";
//     const params = [];
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//             res.status(400).json({"error": err.message});
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": rows
//         })
//     });
// });
//
// app.get('/.netlify/functions/api/database/clear', (req, res, next) => {
//     const sql = "delete from item";
//
//     db.run(sql, [], function (err, result) {
//         if (err) {
//             res.status(400).json({"error": err.message})
//             return;
//         }
//         res.json({
//             "message": "success",
//         })
//     });
// })
//
// app.post("/.netlify/functions/api/database/add-item", (req, res, next) => {
//     let errors = []
//
//     if (!req.body.width) {
//         errors.push("No width specified");
//     }
//     if (!req.body.height) {
//         errors.push("No height specified");
//     }
//     if (!req.body.content) {
//         errors.push("No content specified");
//     }
//     if (errors.length) {
//         res.status(400).json({"error": errors.join(",")});
//         return;
//     }
//     let data = {
//         width: req.body.width,
//         height: req.body.height,
//         content: req.body.content
//     }
//     const sql = 'INSERT INTO item (width,height,content) VALUES (?,?,?)'
//     const params = [data.width, data.height, data.content]
//
//     db.run(sql, params, function (err, result) {
//         if (err) {
//             res.status(400).json({"error": err.message})
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": data,
//         })
//     });
// })

module.exports.handler = serverless(app);
