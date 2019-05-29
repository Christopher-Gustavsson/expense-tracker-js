
const express = require('express');
const mysql = require('mysql');
const mysqlCredentials = require('./mysql-creds.js');
const cors = require("cors");
const db = mysql.createConnection(mysqlCredentials);
const server = express();
server.use(cors());
server.use(express.static(__dirname + '/public'));
server.use(express.urlencoded({extended: false}));

server.get('/api/bills', (req, resp) => {
    db.connect(() => {
        const query = 'SELECT `id`, `vendor`, `description`, `amount`, `dueDate` FROM `bills`';

        db.query(query, (error, data) => {
            if(error){
                throw error;    
            }
            const output = {
                success: true,
                bills: data
            };
            resp.send(output);
        });
    });
});

server.post('/api/bills', (req, resp) => {
    if(req.body.vendor === undefined || req.body.description === undefined || req.body.amount === undefined || req.body.dueDate === undefined){
        resp.send({
            success: false,
            error: 'Invalid vendor, description, amount, or due date'
        });
    }

    db.connect(() => {
        const query = 'INSERT INTO `bills` SET `vendor`="' + req.body.vendor + '", `description`="' + req.body.description + '", `amount`=' + req.body.amount + ', `dueDate`="' + req.body.dueDate + '"';
        
        db.query(query, (error, data) => {
            if(!error){
                resp.send({
                    success: true,
                    new_id: data.insertId
                });
                
            }
            else{
                resp.send({
                    success: false,
                });
            }
        });
    
    });

});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
})