
const express = require('express');
const mysql = require('mysql');
const mysqlCredentials = require('./mysql-creds.js');
const db = mysql.createConnection(mysqlCredentials);
const server = express();
server.use(express.static(__dirname + '/public'));

server.get('/api/bills', (req, resp) => {
    db.connect(() => {
        console.log('MySQL connected...')
        const query = "SELECT `id`, `vendor`, `description`, `amount`, `dueDate` FROM `bills`";

        db.query(query, (error, data) => {
            if(error){
                throw error;    
            }
            resp.send({
                success: true,
                bills: data
            });
        });
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})