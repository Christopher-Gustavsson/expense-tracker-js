
const express = require('express');
const mysql = require('mysql');
const mysqlCredentials = require('./mysql-creds.js');
const cors = require("cors");
const db = mysql.createConnection(mysqlCredentials);
const server = express();
server.use(express.json());
server.use(cors());
server.use(express.static(__dirname + '/public'));
server.use(express.urlencoded({extended: true}));


//Read all bills from db
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

//Create bill in db
server.post('/api/bills', (req, resp) => {
    if(req.body.vendor === undefined || req.body.description === undefined || req.body.amount === undefined || req.body.dueDate === undefined){
        resp.send({
            success: false,
            error: 'Invalid vendor, description, amount, or due date'
        });
        return;
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

//Delete bill in db
server.delete('/api/bills/:bill_id', (req, resp) => {
    if(req.params.bill_id === undefined){
        resp.send({
            success: false,
            error: 'Bill ID was not provided'
        })
        return;
    }

    db.connect(() => {
        const query = 'DELETE FROM `bills` WHERE `id` = ' + req.params.bill_id;
        db.query(query, (error, data) => {
            if(!error && data.affectedRows !== 0){
                resp.send({
                    success: true
                });
            }
            else{
                resp.send({
                    success: false,
                    error: 'The ID to be deleted does not exist'
                });
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})