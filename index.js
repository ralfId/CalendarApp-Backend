//  importaciones de librerias en node
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/DBConfig');


//  Crear el servidor de express
const app = express();

//Initialize DataBase
dbConnection();

//CORS
app.use(cors());

// directorio publico
app.use(express.static('public'));

//  reading and getting informacion from body
app.use(express.json());



// Rutas
//  auth, create, login, renew
app.use('/api/auth', require('./routes/auth'));

//todo: CRUD events





/* 
    escuchar peticiones
    app.listening(porNumber, callback);
*/
app.listen(process.env.PORT, () => {
    console.log(`servidor corrindo en puerto ${process.env.PORT}`)
});
