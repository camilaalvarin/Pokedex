const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const pokemonRoute = require('./Pokemon')
const typeRoute = require('./Type')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', pokemonRoute);
router.use('/type', typeRoute)

module.exports = router;
