const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./dataBase/config');
const { json } = require('express/lib/response');

//crear server
const app = express();

//base de datos
dbConnection();

//user
//Ara
//pass
//YCtQIFzKcoj4Yk3x

//lectura del body
app.use( express.json());

//configurar cors
app.use( cors() );

//ruta
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );

app.listen( process.env.PORT, () => {
    console.log('corriendo en el puerto' + process.env.PORT);
})