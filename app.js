const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'build')));

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
});


db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("MYSQL Connected...");
});

/*===========================================================================================================
                                                SELECT
=============================================================================================================*/
app.get("/registrations", (req, res) => {
    let sql = "SELECT * FROM registration";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});
/*===========================================================================================================
                                                INSERT
=============================================================================================================*/
app.post("/addregistration", (req, res) => {
    const obj = {
        first: req.body.first,
        last: req.body.last,
        age: req.body.age
    }
    let sql = `INSERT INTO registration(first, last, age) VALUES('${obj.first}', '${obj.last}', ${obj.age});`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("lisätty");
    });
});

/*===========================================================================================================
                                                UPDATE
=============================================================================================================*/
app.put("/editregistration", (req, res) => {
    const obj = {
        id: req.body.id,
        first: req.body.first,
        last: req.body.last,
        age: req.body.age
    }
    let sql = `UPDATE registration SET id = ${obj.id}, first ='${obj.first}', last = '${obj.last}', age = ${obj.age} WHERE id = 1;`;
    
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("Tiedot muutettu");
    });
});

/*===========================================================================================================
                                                DELETE
=============================================================================================================*/
app.delete("/editregistration", (req, res) => {
    const obj = {
        id: req.body.id,
        first: req.body.first,
        last: req.body.last,
        age: req.body.age
    }
    let sql = `DELETE FROM registration WHERE id = ${obj.id};`;
    
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("Tiedot poistettu");
    });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build'));
});

app.listen("5000", () => {
    console.log("Server started on port 3000");
});