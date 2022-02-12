const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db');
// const type = require('../models/type');
const router = Router();

// router.get('/', async (req, res) => {
//     const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
//     const types = await typesApi.data.results.map(el => el.name)
//     console.log(types)
//     const typesEach = types.map(el => {
//         for (let i=0; i < el.length; i++) return el[i];
//     })
//     typesEach.forEach(el => {
//         Type.findOrCreate({
//             where: { name:el }
//         })
//     })
//     const allTypes = await Type.findAll()
//     res.send(allTypes)
// })

// router.get('/', async (req, res) => {
//         const typesApi = await axios.get (`https://pokeapi.co/api/v2/type`);
//         const types = await typesApi.data.results.map(el => el.name)
//         console.log(types)
//         const typesEach = types.map(el => {
//             for (let i=0; i < el.length; i++) return el[i];
//         })
//         typesEach.forEach(el => {
//             Type.findOrCreate({
//                 where: { name: el }
//             })
//         })
//         const allTypes = await Type.findAll()
//         res.send(allTypes)
//     })

// -----------------------------

router.get('/', async (req, res) => {
    try {
        const typesApi = await axios.get (`https://pokeapi.co/api/v2/type`);
        const types =  typesApi.data.results   // await --- .map(el => el.name) 
        // const types = await typesApi.data.results.map(el => {
        //     return {
        //     type: el.name
        //     }
        // }) 
        // console.log(types)
        // const typesEach = types.map(el => {
        //     for (let i=0; i < el.length; i++) return el[i];
        // })
        types.forEach(el => {
            Type.findOrCreate({
                where: { name: el.name }
            })
        })
        const allTypes = await Type.findAll()
        res.send(allTypes)
    } catch (error) {
        res.status(404).send('jodete')
    }
    })

// ------------------------------------

// router.get('/', async (req, res) => {
//         const apiUrl = await axios.get (`https://pokeapi.co/api/v2/type`);
//         const apiInfo = await apiUrl.data.results.map(el => {
//             return {
//                 type: el.name
//             }
//         })
//         res.send(apiInfo)
//     })

// ---- INTENTO -----

// const getApiInfo = async () => {
//     const apiUrl = await axios.get (`https://pokeapi.co/api/v2/pokemon`);
//     const apiInfo = await apiUrl.data.results.map(el => {
//         return {
//             name: el.name
//         }
//     })
    // console.log(apiInfo)
//     return apiInfo
// }

// router.get('/', (req, res) => {
//     res.json(getApiInfo())
// })

// ASI FUNCIONA ↓

// router.get('/', async (req, res) => {
//     const apiUrl = await axios.get (`https://pokeapi.co/api/v2/type`);
//     const apiInfo = await apiUrl.data.results.map(el => {
//         return {
//             type: el.name
//         }
//     })
//     res.send(apiInfo)
// })

// HASTA ACA


// EL CODIGO QUE ME TRAJE DE ALGUIEN MAS 
// router.get('/', async (req,res) =>{

//     const typeDb = await Type.findAll();

//     try {
//         if(typeDb.length === 0){
//             let typeApi = await axios.get(`https://pokeapi.co/api/v2/type`);
//             typeApi = typeApi.data.results.map(t => t.name);
//             typeApi.forEach(t =>{
                // Type.findOrCreate({
                //Type.create({
//                 Type.create({
//                     name: t
//                 });
//             });
//         }
//         res.json(typeDb);
//     } catch (error) {
//         return res.status(404).json({error: 'Tipos no fueron cargados' + error});
//     }
// })


// ESTO ES LO POCO QUE HICE YO... EN ALGUN MOMENTOLO PODRIA SEGUIR ↓
// router.get('/', (req, res, next) => {
//     res.status(201).send(`Hello, it's me, Type get!`)
// })
// router.post('/', (req, res, next) => {
//     res.status(201).send(`Hello, it's me, Type post!`)
// })
// router.put('/', (req, res, next) => {
//     res.status(201).send(`Hello, it's me, Type put!`)
// })
// router.delete('/', (req, res, next) => {
//     res.status(201).send(`Hello, it's me, Type delete!`)
// })

module.exports = router