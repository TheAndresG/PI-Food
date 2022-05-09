const { Router } = require('express');
const { Recipe, Diet } = require("../db")

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const { title,
            dietID,
            summary,
            spoonacularScore,
            healthScore,
            image,
            instructions } = req.body;
        const newReceta = await Recipe.create({
            title,
            summary,
            spoonacularScore,
            healthScore,
            image,
            instructions
        })
        if (dietID.length == 0) dietID.push(1)
        dietID.map((e) => newReceta.addDiet(e))

        return res.send(newReceta)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
