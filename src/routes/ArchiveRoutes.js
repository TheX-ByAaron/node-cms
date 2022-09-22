const express = require('express');
const Mongoose = require('mongoose');
const { ClientSchema } = require('../schemas/ClientSchema');
const { ArchiveSchema } = require('../schemas/ArchiveSchema');
const router = express.Router();

const Client = Mongoose.model('clients', ClientSchema);
const Archive = Mongoose.model('archive', ArchiveSchema);

router.post('/add/:idClient', async (req,res)=>{

    const id = req.params.idClient;

    if(!id){
        return res.status(400).send("Your id is invalid");
    }

    const client = await Client.findById(id).catch();

    if(!client){
        return res.status(404).send("Client not found");
    }

    let newArchivedClient = new Archive({
        name: client.name,
        surname: client.surname,
        company_name: client.company_name,
        position: client.position,
        description: client.description,
        client_wilaya: client.client_wilaya,
        client_picture_url: client.client_picture_url,
    })

    let result = await newArchivedClient.save();

    if(!result){
        return res.status(500).send("Error archiving the client");
    }

    let deletionResult = await Client.findByIdAndDelete(id);

    if(!deletionResult){
        return res.status(500).send("Client archived but was not deleted from the clients list");
    }

    res.send(result);
});

router.get('/clients', async (_req,res)=>{
    
    let clients = await Archive.find()

    if(!clients || clients.length === 0){
        return res.status(404).send("No client was found");
    }

    res.send(clients);
})

module.exports = router;