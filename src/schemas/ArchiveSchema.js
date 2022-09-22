const Mongoose = require('mongoose');

const ArchiveSchema = new Mongoose.Schema({
    name: String,
    surname: String,
    company_name: String,
    position: String,
    description: String,
    client_wilaya: String,
    client_picture_url: String,
})

module.exports.ArchiveSchema = ArchiveSchema;