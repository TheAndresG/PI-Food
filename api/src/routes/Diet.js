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
    res.send("Dieta!")
})

router.put("/", (req, res) => {
    res.send("Dieta!")
})

router.delete("/", (req, res) => {
    res.send("Dieta!")
})

module.exports = router;
