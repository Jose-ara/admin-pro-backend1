const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    // verificar email
    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'email no encontrado'
            })
        }


        //verificar contraseña
        const verificarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!verificarPassword) {
            res.status(400).json({
                ok: false,
                msg: "la contraseña no es correcta"
            })
        }

        //Generar el TOKEN
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Explotó esta vaina"
        })
    }
}

module.exports = {
    login
}