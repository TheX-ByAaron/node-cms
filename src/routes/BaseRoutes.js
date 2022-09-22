const express = require('express');
const Mongoose = require('mongoose');
const { validateAuth } = require('../validations/AuthValidation');
const { AdminSchema } = require('../schemas/AdminSchema');
const router = express.Router()

const Admin = Mongoose.model('admins', AdminSchema);

router.post('/auth/login', async (req, res)=>{

    const {error, value} = validateAuth(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let currentAdmin = await Admin.findOne({username: value.username, password: value.password});

    if(!currentAdmin){
        return res.status(404).send('Error there is no such admin with the specified username and password');
    }

    res.send(currentAdmin);
});

module.exports = router;