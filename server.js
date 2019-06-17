
const express = require('express');
const mysql = require('mysql');
const mysqlCredentials = require('./mysql-creds.js');
mysqlCredentials.multipleStatements = true;
const cors = require("cors");
const cron = require('node-cron');
const db = mysql.createConnection(mysqlCredentials);
const server = express();
server.use(express.json());
server.use(cors());
server.use(express.static(__dirname + '/public'));
server.use(express.urlencoded({extended: true}));


//Create bill in db
server.post('/api/bills', (req, resp) => {
    const {vendor, description, amount, dueDate} = req.body;
    if(vendor === undefined || description === undefined || amount === undefined || dueDate === undefined){
        resp.send({
            success: false,
            error: 'Invalid vendor, description, amount, or due date'
        });
        return;
    }

    db.connect(() => {
        const formattedDueDate = formatDate(dueDate);
        const query = 'INSERT INTO `bills` SET `vendor`= ?, `description`= ?, `amount`= ?, `dueDate`= ?';
        
        db.query(query, [vendor, description, amount, formattedDueDate], (error, data) => {
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

//Update bill in db
server.post('/api/bills/update', (req, resp) => {
    const {id, vendor, description, amount, dueDate} = req.body;

    if(id === undefined || vendor === undefined || description === undefined || amount === undefined || dueDate === undefined){
        resp.send({
            success: false,
            error: 'Invalid vendor, description, amount, or due date'
        });
        return;
    }

    db.connect(() => {
        const formattedDueDate = formatDate(dueDate);
        const query = 'UPDATE `bills` SET `vendor`= ?, `description`= ?, `amount`= ?, `dueDate`= ? WHERE `id` = ?';

        db.query(query, [vendor, description, parseFloat(amount), formattedDueDate, id], (error) => {
            if(!error){
                resp.send({
                    success: true
                });
            }
            else{
                resp.send({
                    success: false,
                    error: error
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

function formatDate(date){
    const year = date.slice(0,4);
    const month = date.slice(5,7);
    const day = date.slice(8);
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
}

// Set automatic task with cron
const cronNewTable = cron.schedule('0 * * * *', () => {
    console.log("cronNewTable called");
    const query = 'CREATE TABLE `bills_new` LIKE `bills`; RENAME TABLE `bills` TO `bills_old`, `bills_new` TO `bills`; INSERT INTO `bills` (`id`, `vendor`, `description`, `amount`, `dueDate`) VALUES (1, "AT&T", "Phone bill", 60, "06-20-2019"), (2, "Spectrum", "Internet bill", 49.99, "06-20-2019"), (3, "HULU", "Tv and movie streaming", 8.49, "06-06-2019"), (4, "SoCal Gas", "Gas bill", 36.87, "06-23-2019"), (5, "HBO", "Tv and movie streaming", 14.99, "06-08-2019"), (6, "Spotify", "Music streaming", 14.99, "06-26-2019"), (7, "SoCalEdison", "Electricity bill", 163.79, "06-27-2019")';
});

cronNewTable.start();
const cronDropOldTable = cron.schedule('10 * * * *', () => {
    const dropOldTableQuery = "DROP TABLE IF EXISTS `bills_old`";
});

cronDropOldTable.start();

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})
