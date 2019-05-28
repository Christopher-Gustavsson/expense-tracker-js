
const express = require('express');
const mysql = require('mysql');
const mysqlCredentials = require('./mysql-creds.js');
const db = mysql.createConnection(mysqlCredentials);
const server = express();
server.use(express.static(__dirname + '/public'));

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connected...')
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
})