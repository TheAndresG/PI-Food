const { Router } = require('express');
const { Diet } = require("../db")
const router = Router();

router.get("/", (req, res) => {
    // let array = Diet.findAll({ attributes: ["id", "name"] }).then(dieta => JSON.stringify(dieta))
    try {
        return Diet.findAll()
            .then((diet) => {
                return res.send(diet)
            })
    } catch (error) {
        next(error)
    }
})

router.post("/", (req, res) => {
    res.send("POST Dieta!")
})

router.put("/", (req, res) => {
    res.send("PUT Dieta!")
})

router.delete("/", (req, res) => {
    res.send("DELETE Dieta!")
})

module.exports = router;
