const { Router } = require('express');
const { Pokemon, Type } = require('../db')
const router = Router();
const axios = require('axios')


// ---------------------------------------------------------------------------------------- PROBANDO
const getApiInfo = async () => {
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

    let showAll = apisConcat.map(el => {
        return axios.get(el.url)
    })

    showAll = await Promise.all(showAll);
     

    const finalInfo = await showAll.map(p => {
        return {
            // image: p.data.sprites.other.dream_world.front_default,
            // image: p.data.sprites.other.home.front_default,
            image  : p.data.sprites.other.dream_world.front_default,
            // image  : p.data.sprites.other.official-artwork.front_default,
            id: p.data.id,
            name: p.data.name,
            type: p.data.types.map(t => t.type.name + '  '),
            attack: p.data.stats[1].base_stat,
            hp     : p.data.stats[0].hp,
            defense: p.data.stats[2].defense,
            speed  : p.data.stats[5].speed,
            height : p.data.height,
            weight : p.data.weight
        
    }
})   
    // console.log(nextInfo)
    // console.log(apisConcat)
    // console.log(showAll)
    // console.log(finalInfo)
    return finalInfo
}
   
// ----------- PROBANDO RUTA 

// router.get('/', (req, res) => {
//     res.send(getApiInfo())
// })

// ------------------------------------------------------------------------------------------ PROBANDO




//  ------------------------------------------

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: Type
    })
}

// router.get('/', (req, res) => {
//     res.send(getDbInfo())
// })

// router.get('/', async (req, res) => {
//     let camila = await Pokemon.findAll({
//                 include: Type
//             })
//     res.send(camila)
// })



//  --------------------------------------------

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

// RUTA OK ---------------------------------------------------------------------------------

router.get('/', async (req, res) => {
    const { name } = req.query;

    let pokemonsTotal = await getAllPokemons()

    if(name) {
        let pokemonName = await pokemonsTotal.filter(el => el.name.trim().toLowerCase().includes(name.trim().toLowerCase()));
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send(`El ${name} ingresado no corresponde a un pokemon existente`)
    } else {
        res.status(200).send(pokemonsTotal)
    }
})


 
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

    try {
        if(name) {
            let pokemonCreated = await Pokemon.create({
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
    
 
    // let typeDb = await Type.findAll({
    //     where: { name : type}
    // })

    type.forEach(async type => {
        let pokemonType = await Type.findOne({    // ----------------------------- findOne
            where: { name: type}
        })
        await pokemonCreated.addType(pokemonType)
    })
 
    // await pokemonCreated.addType(typeDb) 
    return res.status(200).send(pokemonCreated)
}
catch (error) {
    console.log(error)
}
})
 
 


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
                // type  : pokemonId.type.map(t => t.name)     // ------------------------------- TYPE
            }
            if (pokemonTypesId) return res.json(pokemonTypesId);
        } catch (error) {
            return res.status(404).json({error: `No se encontro ${id}` });
        }
    };
    try {
        let pokemon_Id = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            pokemon_Id ={
                id     : pokemon_Id.data.id,
                name   : pokemon_Id.data.name, 
                image  : pokemon_Id.data.sprites.other.dream_world.front_default,
                // image  : pokemon_Id.data.sprites.other.official-artwork.front_default,
                hp     : pokemon_Id.data.stats[0].base_stat,
                attack : pokemon_Id.data.stats[1].base_stat,
                defense: pokemon_Id.data.stats[2].base_stat,
                speed  : pokemon_Id.data.stats[5].base_stat,
                height : pokemon_Id.data.height,
                weight : pokemon_Id.data.weight,
                type  : pokemon_Id.data.types.map(t => t.type.name)
            };
            return res.json(pokemon_Id)
    } catch (error) {
        return res.status(404).json({error: `No se encontro ${id}` });  
    }
})




module.exports = router