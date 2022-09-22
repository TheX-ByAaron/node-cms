const express = require('express');
const Mongoose = require('mongoose');
const { validateClient } = require('../validations/ClientValidation');
const { ClientSchema } = require('../schemas/ClientSchema');
const router = express.Router()

const Client = Mongoose.model('clients', ClientSchema);

router.get('/all',async (_req,res)=>{

    let clients = await Client.find();

    if(!clients || clients.length === 0){
        return res.status(404).send("No client was found");
    }

    res.send(clients);
});

router.get('/wilaya/:wilaya',async (req,res)=>{

    const wilaya = req.params.wilaya;

    if(!wilaya){
        return res.status(400).send("Your wilaya is invalid");
    }

    let clients = await Client.find({client_wilaya: wilaya});

    if(!clients || clients.length === 0){
        return res.status(404).send("No client was found");
    }

    res.send(clients);
});

router.get('/details/:id',async (req,res)=>{

    const id = req.params.id;

    if(!id || id.length > 24){
        return res.status(400).send("Your id is invalid");
    }

    let client = await Client.findById(id);

    if(!client){
        return res.status(404).send("No client was found");
    }

    res.send(client);
});

router.post('/add', async (req,res)=>{

    const {error, value} = validateClient(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const newClient = new Client(value);
    let result = await newClient.save();

    if(!result){
        return res.status(500).send("Error with the database");
    }

    res.status(201).send(result);
});

router.put('/update/:id', async (req,res)=>{

    const {error, value} = validateClient(req.body);
    const id = req.params.id;

    if(!id || id.length > 24){
        return res.status(400).send("Your id is invalid");
    }

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let result = await Client.updateOne({_id: id},{
        $set : value
    });

    if(!result){
        return res.status(500).send("Error with the database");
    }

    res.send(result);
})

module.exports = router;