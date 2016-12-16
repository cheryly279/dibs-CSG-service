'use strict';

const express = require('express');
const mysql = require('mysql');

const app = express();
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

app.get('/', function (req, res) {
   res.send('Hello World');
});

const server = app.listen(8081, function () {
   const host = server.address().address;
   const port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);
});
