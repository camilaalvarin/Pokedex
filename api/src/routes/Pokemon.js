const { Router } = require('express');
const { Pokemon, Type } = require('../db')
const router = Router();
const axios = require('axios');
const db = require('../db');

// FUNC OK ↓ ------------------------------------------------------------------------------  
const getApiInfo = async () => {
    try {
    const apiUrl = await axios.get (`https://pokeapi.co/api/v2/pokemon`); //TRAE LA DATA GENERAL. NAME Y URL
    const apiInfo = await apiUrl.data.results.map(el => {
        return {
            url: el.url
        }
    })
    // console.log(apiInfo)

    const pokemonNext = await axios.get(apiUrl.data.next)
    const nextInfo = await pokemonNext.data.results.map(el => {
        return {
        url: el.url
        }
    }) 
    // console.log(nextInfo)
    
    const apisConcat = apiInfo.concat(nextInfo)

    let showAll = apisConcat.map(el => {   //ACA QUEDA COMO PROMISE PENDING
        return axios.get(el.url)
    })
    showAll = await Promise.all(showAll); //ACA SE EJECUTAN LAS PROMESAS
 
    const finalInfo = await showAll.map(p => {
        return {
            image  : p.data.sprites.other.dream_world.front_default,
            id: p.data.id,
            name: p.data.name,
            type: p.data.types.map(t => t.type.name), 
            attack: p.data.stats[1].base_stat,
            hp     : p.data.stats[0].hp,
            defense: p.data.stats[2].defense,
            speed  : p.data.stats[5].speed,
            height : p.data.height,
            weight : p.data.weight
        
        }  
    })   
        return finalInfo

    } catch (error) {
        next(error)
    }
}
// FUNC OK ↑ ------------------------------------------------------------------------------  


// FUNC OK ↓ ------------------------------------------------------------------------------  
const getDbInfo = async () => {
    try {
        let dbPokemons = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        }) 

        let pokemonsDb = dbPokemons.map(p => {
            return {
                id     : p.id,
                name   : p.name, 
                image  : p.image,
                hp     : p.hp,
                attack : p.attack,
                defense: p.defense,
                speed  : p.speed,    
                height : p.height,
                weight : p.weight,
                createdDb: p.createdDb,
                type  : p?.Types?.map(t => t.name)        
            }
        })
        return pokemonsDb
    } catch (error) {
        next(error)  
        }
}
// FUNC OK ↑ ------------------------------------------------------------------------------  


// FUNC OK ↓ ------------------------------------------------------------------------------  
const getAllPokemons = async () => {
    try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
    } catch (error) {
        next(error)
        }  
}
// FUNC OK ↑ ------------------------------------------------------------------------------  



// RUTA OK ↓ ------------------------------------------------------------------------------  
// GET /pokemons:
// GET /pokemons?name="..."

router.get('/', async (req, res) => {
    const { name } = req.query;

    let pokemonsTotal = await getAllPokemons()

    try {    

        if(name) {
            let pokemonName = await pokemonsTotal.filter(el => el.name.trim().toLowerCase().includes(name.trim().toLowerCase()));
            pokemonName.length ?
            res.status(200).send(pokemonName) :
            res.status(404).send(`El ${name} ingresado no corresponde a un pokemon existente`)
        } else {
            res.status(200).send(pokemonsTotal)
        }
    }
    catch (error) {
        next(error)
    }
})  
// RUTA OK ↑ ------------------------------------------------------------------------------  


// RUTA OK ↓ ------------------------------------------------------------------------------  

// GET /pokemons/{idPokemon} 

router.get('/:id', async(req,res)=>{
    const { id } = req.params;  

    if (id.includes('-')){
        try {
            const pokemonId = await Pokemon.findByPk(id, {include: Type});

            let pokemonTypesId = {
                id     : pokemonId.id,
                name   : pokemonId.name, 
                image  : pokemonId.image,
                hp     : pokemonId.hp,
                attack : pokemonId.attack,
                defense: pokemonId.defense,
                speed  : pokemonId.speed,    
                height : pokemonId.height,
                weight : pokemonId.weight,
                createdDb: pokemonId.createdDb,
                type  : pokemonId?.Types?.map(t => t.name)     // ------------------------------- TYPE
            }
            if (pokemonTypesId) return res.json(pokemonTypesId);
        } catch (error) {
            return res.status(404).json({error: `No se encontro ${id}` });
        }
    };
    try {    
        let pokemon_Id = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            showPokemonApi ={
                id     : pokemon_Id.data.id,
                name   : pokemon_Id.data.name, 
                image  : pokemon_Id.data.sprites.other.dream_world.front_default,
                hp     : pokemon_Id.data.stats[0].base_stat,
                attack : pokemon_Id.data.stats[1].base_stat,
                defense: pokemon_Id.data.stats[2].base_stat,
                speed  : pokemon_Id.data.stats[5].base_stat,
                height : pokemon_Id.data.height,
                weight : pokemon_Id.data.weight,
                type  : pokemon_Id.data.types.map(t => t.type.name)
            };
            return res.json(showPokemonApi)
    } catch (error) {
        return res.status(404).json({error: `No se encontro ${id}` });  
    }
})  
// RUTA OK ↑ ------------------------------------------------------------------------------  


// RUTA OK ↓ ------------------------------------------------------------------------------  
// POST /pokemons:
// Recibe los datos desde el form controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos

router.post('/', async (req, res) => {
    const {
        name, 
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdDb,
        type 
    } = req.body
 
    let pokemonCreated;
    try {
        if(name) {
                pokemonCreated = await Pokemon.create({
                name,
                image,
                hp,
                attack,
                defense,
                speed, 
                height,
                weight,
                createdDb
            })   
        } else {
            ('Es necesario poner un nombre')
        }
        type?.forEach(async type => {
        let pokemonType = await Type.findOne({    // ----------------------------- findOne
            where: { name: type}
        })
        await pokemonCreated.addType(pokemonType)
    })
    return res.status(200).send(pokemonCreated)
}
catch (error) {
    console.log(error)
} 
})
// RUTA OK ↑ ------------------------------------------------------------------------------  



module.exports = router