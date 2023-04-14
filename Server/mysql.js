const mysql = require("mysql2")


const sqlModel = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lucky@82780",
    database: "Notes"
})

sqlModel.connect((err) => {
    if (err) { console.log(err.message) }
    else { console.log("MySQL Connected") }
})

module.exports = { sqlModel }