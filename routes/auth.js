/* 
    path: '/api/login'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


router.post('/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token', 'La token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
)





module.exports = router;