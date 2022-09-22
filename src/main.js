const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const Mongoose = require('mongoose');

const app = express()
const port = 8080 || env.PORT

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const clientRoutes = require('./routes/ClientRoutes');
const archiveRoutes = require('./routes/ArchiveRoutes');
const baseRoutes = require('./routes/BaseRoutes');

app.get('/',(req,res)=>{
    res.send("Welcome")
})
app.use('/api/v1/base', baseRoutes);
app.use('/api/v1/client', clientRoutes);
app.use('/api/v1/archive', archiveRoutes);


app.listen(port, ()=>{
    Mongoose.connect("mongodb+srv://aaronx:passcode@cluster0.jxedhhz.mongodb.net/crm_db")
            .then(()=>{
                console.log("Server connected to crm_db successfully");
            })
            .catch((error)=>{
                console.log(error.message);
            });

    console.log('server has started on port '+port);
})

