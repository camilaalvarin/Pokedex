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



module.exports = router