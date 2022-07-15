/* 
    Ruta
    '/api/todo/:parametro'
 */

const { Router } = require('express');    
const { validarJWT } = require('../middleware/validar-jwt');

const { getBusqueda, getColeccion } = require('../controllers/busquedas');

const router = Router();

     router.get('/:busqueda',
     [
         validarJWT
     ], getBusqueda);

     router.get('/coleccion/:tabla/:busqueda',
     [
         validarJWT
     ], getColeccion);

module.exports = router;