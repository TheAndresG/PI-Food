const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recetaRouter = require('./Recipe.js');
const dietaRouter = require('./Diet.js');
const crearRouter = require('./Crear.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/Recipes', recetaRouter)
router.use('/types', dietaRouter)
router.use('/Recipe', crearRouter)


module.exports = router;
