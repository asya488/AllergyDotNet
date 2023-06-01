const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const db = new sqlite3.Database('AllergyDotNet.db');

// Parse request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
app.post('/', (req, res) => {
   // const user_id = req.body.user_id; // Отримання user_id з тіла запиту
    const query = 'SELECT doctor_id, doctor_name FROM Doctors'; //, doctor_price, doctor_info, dcotor_photo

    db.all(query,  (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving docotrs from the database');
        }
        res.json(rows);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});