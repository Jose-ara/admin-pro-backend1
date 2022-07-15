/* 
    Ruta
    '/api/medico'
 */
    const { Router } = require('express');
    const { check } = require('express-validator');
    const { validarCampos } = require('../middleware/validar-campos');
    
    const { validarJWT } = require('../middleware/validar-jwt');

    const { getMedicos, crearMedico, updateMedico, deleteMedico} = require('../controllers/medicos')
    
    const router = Router();
    
    router.get( '/', getMedicos);
    
    router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
        check('hospital', 'El Id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);
    
    router.put( '/:id',
    [],
    updateMedico);
    
    router.delete( '/:id',
        deleteMedico
    );
    
    
    module.exports = router;