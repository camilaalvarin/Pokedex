const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db');
const router = Router();

// RUTA OK ---------------------------------------------------------------------------------
// GET /types:
// Obtener todos los tipos de pokemons posibles
// Traerlos desde pokeapi y guardarlos en la db y luego ya utilizarlos desde ahí

router.get('/', async (req, res) => {
    try {
        const typesApi = await axios.get (`https://pokeapi.co/api/v2/type`);
        const types =  await typesApi.data.results 
        types.forEach(el => {
            Type.findOrCreate({
                where: { name: el.name }
            })
        })
        const allTypes = await Type.findAll()
        res.json(allTypes)
    } catch (error) {
        res.status(404).send('jodete')
    }
    })

// FIN RUTA OK ------------------------------------------------------------------------------



module.exports = router