const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUploaded = ( req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar el tipo en la busqueda
    const tiposValidos = ['hospitales', 'medicos' , 'usuarios'];
    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo valido'
        })
    }

    //Validar que exista un archivo
    if( !req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }

    //procesar la imagen
    const file = req.files.image;
    console.log(file);
    const nombreCortado = file.name.split('.'); //wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //extensiones validas
    const extensionValida = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión valida'
        })
    }

    //generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Usar mv para mover la imagen a la ubicación que queramos
    file.mv(path, (error) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Ubicación ivalida'
            })
        }

        //Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });

    });
}

const extraerFoto = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile( pathImg );   
    }else{
        pathImg = path.join(__dirname, `../uploads/no-img.png`);
        res.sendFile( pathImg );
    }
}

module.exports = {
    fileUploaded,
    extraerFoto
}