const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

const conn = mysql.createConnection(models.mysql);
conn.connect();

// Login endpoint
router.post('/login', (req, res) => {
    const user = req.body;
    const sel_email = $sql.user.select + " where email = '" + user.email + "'";
    console.log(sel_email);
    conn.query(sel_email, user.email, (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results)
        if (results[0] === undefined) {
            res.send("-1"); // -1 indicates no record found, user doesn't exist, i.e., incorrect email
        } else {
            if (results[0].email == user.email && results[0].password == user.password) {
                res.send("0"); // 0 indicates user exists and email-password combination is correct
            } else {
                res.send("1"); // 1 indicates user exists, but password is incorrect
            }
        }
    })
});

// Registration endpoint
router.post('/add', (req, res) => {
    const params = req.body;
    const sel_sql = $sql.user.select + " where username = '" + params.username + "'";
    const add_sql = $sql.user.add;
    console.log(sel_sql);

    conn.query(sel_sql, params.username, (error, results) => {
        if (error) {
            console.log(err);
        }
        if (results.length != 0 && params.username == results[0].username) {
            res.send("-1"); // -1 indicates username already exists
        } else {
            conn.query(add_sql, [params.username, params.email, params.password], (err, rst) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rst);
                    res.send("0"); // 0 indicates successful user creation
                }
            });
        }
    });
});

module.exports= router;