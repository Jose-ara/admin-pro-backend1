const { response } = require('express');
const Medico = require('../models/medico')

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    console.log('este es el req', uid);

    try {

       const medicoDB = await medico.save();
       res.json({
        ok: true,
        msg: medicoDB
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateMedico = (req, res = response) => {

    res.json({
        ok: true,msg: 'Actualizar medico'
    })
}

const deleteMedico = (req, res = response) => {

    res.json({
        ok: true,msg: 'Eliminar medico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico
}