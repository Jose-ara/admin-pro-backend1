/* 
    Ruta
    '/api/upload'
 */

    const { Router } = require('express');    
    const fileUpload = require('express-fileupload');
    const { validarJWT } = require('../middleware/validar-jwt');
    
    const { fileUploaded, extraerFoto } = require('../controllers/uploads');
    
    const router = Router();
    router.use(fileUpload());
    
         router.put('/:tipo/:id',
         [
             validarJWT
         ], fileUploaded);

         router.get('/:tipo/:foto', extraerFoto);
    
    
    module.exports = router;