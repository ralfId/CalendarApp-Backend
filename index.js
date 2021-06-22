//  importaciones de librerias en node
const express = require('express');
require('dotenv').config();


//  Crear el servidor de express
const app = express();

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
