const express = require("express")
const app = express()
const route = require("./route/route")
const cors = require("cors")


app.use(express.json())
app.use(cors({origin:"*"}))

app.use("/", route)

app.listen(5000, ()=>{
    console.log("Server running on port 5000")
})