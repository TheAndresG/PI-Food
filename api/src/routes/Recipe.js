const axios = require('axios');
const { Router } = require('express');
const { Op } = require('sequelize');
const { Recipe, API_KEY, Diet } = require("../db")

const router = Router();


router.get("", (req, res, next) => {
    let { name } = req.query
    let pedidoAPI
    let pedidoBD
    try {
        if (name) {
            pedidoAPI = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=2&titleMatch=${name}`)
            pedidoBD = Recipe.findAll({ where: { title: { [Op.iLike]: "%" + name + "%" } }, includes: Diet }).then((recipe) => { return recipe })
        }
        else {
            pedidoAPI = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=2`)
            pedidoBD = Recipe.findAll().then((recipe) => { return recipe })
        }
        Promise.all([pedidoAPI, pedidoBD]).then((respuesta) => {
            const [infoAPI, infoBD] = respuesta
            let filtro = infoAPI.data.results.map((e) => {
                return {
                    id: e.id,
                    title: e.title,
                    dieta: e.diets,
                    image: e.image,
                    summary: e.summary,
                    spoonacularScore: e.spoonacularScore,
                    healthScore: e.healthScore,
                    instructions: e.instructions
                }
            })
            let fullResetas = [...filtro, ...infoBD]
            return res.send(fullResetas.sort())
        })
    } catch (error) {
        next(error)
    }
})
router.get("/:id", async (req, res, next) => {
    let idparam = req.params.id
    let retorno
    try {
        if (idparam.length > 9) {
            retorno = await Recipe.findOne({ where: { id: idparam }, includes: Diet }).then((recipe) => { return recipe })
        }
        else {
            let pedidoAPI = await axios.get(`https://api.spoonacular.com/recipes/${idparam}/information?apiKey=${API_KEY}`)
            retorno = {
                id: pedidoAPI.data.id,
                title: pedidoAPI.data.title,
                image: pedidoAPI.data.image,
                dieta: pedidoAPI.data.diets,
                summary: pedidoAPI.data.summary,
                spoonacularScore: pedidoAPI.data.spoonacularScore,
                healthScore: pedidoAPI.data.healthScore,
                instructions: pedidoAPI.data.instructions
            }
        }
        return res.send(retorno)
    }
    catch (error) { next(error) }

})
router.post("/", (req, res) => {
    return res.send("Receta!")
})

router.put("/", (req, res) => {
    return res.send("Receta!")
})

router.delete("/", (req, res) => {
    return res.send("Receta!")
})
router.get("/:id", async (req, res, next) => {
    let idparam = req.params.id
    res.send("ESTAS HACIENDO POST CON " + idparam)
})


module.exports = router;
