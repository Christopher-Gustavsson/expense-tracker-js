
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
            resp.send(data);
        });
    });
    // resp.send(`{
    //     "success": true,
    //     "bills": [{
    //         "id": 1,
    //         "vendor": "AT&T",
    //         "description": "Phone bill",
    //         "amount": 60.00,
    //         "dueDate": "05/20/2019"
    //     }, 
    //     {
    //         "id": 2,
    //         "vendor": "SoCal Edison",
    //         "description": "Electricity bill",
    //         "amount": 150.00,
    //         "dueDate": "05/25/2019"
    //     },
    //     {
    //         "id": 3,
    //         "vendor": "Spectrum",
    //         "description": "Internet bill",
    //         "amount": 49.99,
    //         "dueDate": "05/23/2019"
    //     }
    // ]
    // }
    // `);
});

db.connect((err) => {
    if(err){
        throw err;
    }
    
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
})