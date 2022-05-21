const axios = require('axios');
const { Router } = require('express');
const { Op, useInflection } = require('sequelize');
const { Recipe, API_KEY, Diet } = require("../db")

const router = Router();


router.get("", (req, res, next) => {
    let { name } = req.query
    let pedidoAPI
    let pedidoBD

    try {
        pedidoAPI = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        if (name) {
            pedidoBD = Recipe.findAll({ where: { title: { [Op.iLike]: "%" + name + "%" } }, includes: { model: Diet, attributes: ["name"], through: { attributes: [] } } }).then((recipe) => { return recipe })
        }
        else {
            pedidoBD = Recipe.findAll({ include: { model: Diet, attributes: ["name"], through: { attributes: [] } } }).then((recipe) => { return recipe })
        }

        Promise.all([pedidoAPI, pedidoBD]).then((respuesta) => {
            const [infoAPI, infoBD] = respuesta
            let filtro = infoAPI.data.results.map((e) => {
                return {
                    id: e.id,
                    title: e.title,
                    diets: e.diets,
                    image: e.image,
                    summary: e.summary,
                    spoonacularScore: e.spoonacularScore,
                    healthScore: e.healthScore,
                    dishTypes: e.dishTypes,
                    instructions: e.instructions
                }
            })
            //Cambie el filtro desde el pedido API a un filtro casero. No olvidarme que de leer el Readme mas seguido para ahorrarme estos cambios a ultimo momento
            let filtroDB = infoBD.map((e) => {
                return {
                    id: e.id,
                    title: e.title,
                    diets: e.diets !== undefined ? e.diets.map(e => e.name) : [],
                    image: e.image,
                    summary: e.summary,
                    spoonacularScore: e.spoonacularScore,
                    healthScore: e.healthScore,
                    dishTypes: e.dishTypes,
                    instructions: e.instructions
                }
            })


            if (name) {
                filtro = filtro.filter((e) => e.title.toLowerCase().includes(name.toLowerCase()))
            }

            let fullResetas = [...filtro, ...filtroDB]

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
            retorno = await Recipe.findOne({
                where: { id: idparam }, include: {
                    model: Diet,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            }).then((recipe) => {
                let envio = {
                    id: recipe.id,
                    title: recipe.title,
                    diets: recipe.diets.map(e => e.name),
                    image: recipe.image,
                    summary: recipe.summary,
                    spoonacularScore: recipe.spoonacularScore,
                    healthScore: recipe.healthScore,
                    dishTypes: recipe.dishTypes,
                    instructions: recipe.instructions
                }

                return envio
            })
        }
        else {
            let pedidoAPI = await axios.get(`https://api.spoonacular.com/recipes/${idparam}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
            retorno = {
                id: pedidoAPI.data.id,
                title: pedidoAPI.data.title,
                image: pedidoAPI.data.image,
                diets: pedidoAPI.data.diets,
                summary: pedidoAPI.data.summary,
                spoonacularScore: pedidoAPI.data.spoonacularScore,
                healthScore: pedidoAPI.data.healthScore,
                dishTypes: pedidoAPI.data.dishTypes,
                instructions: pedidoAPI.data.instructions
            }
        }
        return res.send(retorno)
    }
    catch (error) { next(error) }

})
router.post("/", (req, res) => {
    return res.send("Estas haciendo un POST en recetas!")
})

router.put("/", (req, res) => {
    return res.send("Estas haciendo un PUT en recetas!")
})

router.delete("/", (req, res) => {
    return res.send("Estas haciendo un DELETE en recetas!")
})



module.exports = router;
