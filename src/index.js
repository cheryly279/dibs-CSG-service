'use strict';

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connection = mysql.createConnection({
    host: 'coding-standard-digest.c0krrqwzvwip.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'guest1234',
    database: 'coding_standard_digest'
});

app.get('/maintainers/all', function (req, res) {
    connection.query('SELECT * FROM maintainers', (err, rows) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(rows));
    });
});

app.get('/maintainer/:maintainerId', (req, res) => {
    connection.query(`SELECT * FROM maintainers WHERE id = ${req.params.maintainerId}`, (err, rows) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(rows));
    });
});

app.post('/maintainer/', (req, res) => {
    connection.query(`INSERT INTO maintainers (username, email) VALUES ('${req.body.username}', '${req.body.email}')`, (err, result) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        }
        res.status(201);
        res.send('success');
    });
});

app.get('/topics/all', function (req, res) {
    connection.query('SELECT * FROM topics', (err, rows) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(rows));
    });
});

app.get('/topics/:topicId', (req, res) => {
    connection.query(`SELECT * FROM topics WHERE id = ${req.params.topicId}`, (err, rows) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(rows));
    });
});

app.post('/topic/', (req, res) => {
    connection.query(`INSERT INTO topics (addedBy, name, description, url) VALUES (${req.body.addedBy}, '${req.body.name}', '${req.body.description || ''}', '${req.body.url || ''}')`, (err, result) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        }
        res.status(201);
        res.send('success');
    });
});

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
