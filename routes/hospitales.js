/* 
    Ruta
    '/api/hospitales'
 */
    const { Router } = require('express');
    const { check } = require('express-validator');
    const { validarCampos } = require('../middleware/validar-campos');
    
    const { validarJWT } = require('../middleware/validar-jwt');

    const { getHospitales, crearHospital, updateHospital, deleteHospital} = require('../controllers/hospitales')
    
    const router = Router();
    
    router.get( '/', getHospitales);
    
    router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital);
    
    router.put( '/:id',
    [],
    updateHospital);
    
    router.delete( '/:id',
        deleteHospital
    );
    
    
    module.exports = router;