const express = require("express")
const router = express.Router()
const { sqlModel } = require("../mysql")

router.get("/hello", (req, res) => {
    res.send("Hello")
})


router.post("/notes", (req, res) => {
    let data = req.body;

    let option = `insert into notes (title, description, createdAt) values ('${data.title}', '${data.description}', '${data.createdAt}')`

    sqlModel.query(option, (err, data) => {
        if (err) {console.log(err.message); res.send(err.message) }
        else { res.send(data) }
    })
})

router.get("/notes", (req, res) => {
    let option = "select * from notes"
    sqlModel.query(option, (err, data) => {
        if (err) { res.send(err.message) }
        else { res.send(data) }
    })
})

//try catch
//status code
//proper err message

router.delete("/notes/:id", (req, res) => {
    let id = req.params.id
    if (!id) { res.send("Please enter id in params") }
    let option = `delete from notes where id=${id}`
    sqlModel.query(option, (err, data) => {
        if (err) { res.send(err.message) }
        else { res.send("Deleted") }
    })
})

router.get("/*", (req, res)=>{
    res.send("page not found")
})

module.exports = router