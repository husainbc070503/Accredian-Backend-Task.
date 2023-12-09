const mysql = require('mysql2');
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const connectToDB = mysql.createConnection({ host, port, user, password, database });
connectToDB.connect((err) => {
    if (err) throw err;
    console.log('Connected Successfully!!');
})
connectToDB.destroy();

module.exports = connectToDB;