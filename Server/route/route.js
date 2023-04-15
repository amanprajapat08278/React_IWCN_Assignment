const express = require("express")
const router = express.Router()
const { sqlModel } = require("../mysql")


//Create note API

router.post("/notes", (req, res) => {

    try {
        let data = req.body;

        const { title, description, createdAt } = data

        //validations
        if (!title || title.length > 20 || title.length == 0) {
            res.status(400).send({ status: false, message: " Title must be present or length is between 1 to 20 !" })
        }

        if (!description || description.length == 0 || description.length > 500) {
            res.status(400).send({ status: false, message: " Description must be present or length is between 1 to 500 !" })
        }

        if (!createdAt) {
            res.status(400).send({ status: false, message: "Time and Date must be present !" })
        }

        //query
        let qry = `insert into notes (title, description, createdAt) values ('${data.title}', '${data.description}', '${data.createdAt}')`

        sqlModel.query(qry, (err, data) => {
            if (err) { res.status(400).send({ status: false, message: err.message }) }
            else { res.status(201).send({ status: true, data: data }) }
        })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
})


// Get all notes API

router.get("/notes", (req, res) => {

    try {
        let qry = "select * from notes"

        sqlModel.query(qry, (err, data) => {
            if (err) { res.status(400).send({ status: false, message: err.message }) }
            else { res.status(200).send({ status: true, data: data }) }
        })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
})



// Delete a note API

router.delete("/notes/:id", (req, res) => {

    try {
        let id = req.params.id
        if (!id) { res.status(400).send({ status: false, message: "id is missing !" }) }

        let qry = `delete from notes where id=${id}`

        sqlModel.query(qry, (err, _) => {
            if (err) { res.status(400).send({ status: false, message: err.message }) }
            else { res.status(200).send({ status: false, message: "Deleted Succesfully" }) }
        })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
})



router.get("/*", (_, res) => {
    res.status(404).send({ status: false, message: "Page not found !" })
})

module.exports = router