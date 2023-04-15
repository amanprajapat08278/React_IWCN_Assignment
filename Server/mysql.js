const mysql = require("mysql2")
const dotenv = require("dotenv")

dotenv.config()

const sqlModel = mysql.createConnection(process.env.DATABASE_URL)

sqlModel.connect((err) => {
    if (err) { console.log(err.message) }
    else { console.log("MySQL Connected") }
})

module.exports = { sqlModel }