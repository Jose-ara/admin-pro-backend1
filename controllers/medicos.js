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

const updateMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "Medico no encontrado"
            });
        }

        const cambiosMedico = ({
            ...req.body,
            usuario: uid
        });

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            medico: medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No se pudo actualizar la info del medico"
        })
    }
}

const deleteMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: "Medico no encontrado"
            });
        }


        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No se pudo Eliminar la info del medico"
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico
}