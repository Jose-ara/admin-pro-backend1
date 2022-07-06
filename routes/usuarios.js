/* 
    Ruta
    '/api/usuarios'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getUsuarios, borrarUsuario, crearUsuario, actualizarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsuarios);

router.post( '/', 
[ 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
],
crearUsuario);

router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
],
actualizarUsuario);

router.delete( '/:id',
[
    validarJWT,
    validarCampos
],
borrarUsuario);


module.exports = router;