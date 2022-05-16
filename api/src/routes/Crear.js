const { Router } = require('express');
const { Recipe } = require("../db")

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        let { title,
            dietsID,
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
        if (dietsID !== null && dietsID !== []) {
            for (let i = 0; i < dietsID.length; i++) {
                await newReceta.addDiet(dietsID[i])
            }
        }

        // dietID.map((e) => newReceta.addDiet(e))
        //console.log(dietID);

        return res.send(newReceta)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
