const Mongoose = require('mongoose');


const AdminSchema = new Mongoose.Schema({
    username: String,
    password: String
});

module.exports.AdminSchema = AdminSchema;