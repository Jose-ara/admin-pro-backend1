const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./dataBase/config')

//crear server
const app = express();

//base de datos
dbConnection();

//user
//Ara
//pass
//YCtQIFzKcoj4Yk3x

//configurar cors
app.use( cors() );

//ruta
app.get( '/', (rep, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})

app.listen( process.env.PORT, () => {
    console.log('corriendo en el puerto' + process.env.PORT);
})