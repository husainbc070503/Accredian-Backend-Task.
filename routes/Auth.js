const connectToDB = require('../conn');
const bcryptjs = require('bcryptjs');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const { Register, Login } = require('../validators/AuthValidator');
const route = require('express').Router();

route.post('/register', AuthMiddleware(Register), async (req, res) => {
    try {
        const { name, email, password, profile } = req.body;
        var query = 'SELECT * FROM authentication WHERE email = ?';
        connectToDB.query(query, [email], (async (err, data) => {
            if (err) {
                return res.json({ success: false, message: err.message });
            } else if (data.length > 0) {
                return res.json({ success: false, message: 'User already exists' });
            } else {
                const salt = await bcryptjs.genSalt(10);
                const secPass = await bcryptjs.hash(password, salt);

                query = "INSERT INTO authentication (name, email, password, profile) VALUES ?;";
                const values = [[name, email, secPass, profile]];
                connectToDB.query(query, [values], ((err, result) => {
                    if (err) {
                        return res.json({ success: false, message: err.message });
                    } else {
                        return res.json({ success: true, result })
                    }
                }));
            }
        }));

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

route.post('/login', AuthMiddleware(Login), async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = 'SELECT * FROM authentication WHERE email = ?';
        connectToDB.query(query, [email], (async (err, data) => {
            if (err) {
                return res.json({ success: false, message: err.message });
            } else if (data.length == 0) {
                return res.json({ success: false, message: 'Unfetched user. Please register' });
            } else {
                const resp = await bcryptjs.compare(password, data[0].password);
                if (!resp)
                    return res.json({ success: false, message: "Invalid credentials" });
                res.json({ success: true, user: data[0] });
            }
        }));
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

/* route.get('/user', async (req, res) => {
    try {
        const { email } = req.body;
        const query = "SELECT * FROM authentication WHERE email = ?;";
        connectToDB.query(query, [email], ((err, data) => {
            if (err)
                return res.json({ success: false, message: err.message });
            else
                return res.json({ success: true, user: data[0] });
        }))
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}) */

module.exports = route

/* To insert more than one record, make an array containing the values, and insert a question mark in the sql, which will be replaced by the value array */