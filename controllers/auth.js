const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify')

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

const googleSingIn = async (req, res = response) => {

    try {
        const {email, name, picture} = await googleVerify(req.body.token);

        const userDB = await Usuario.findOne({ email });
        let usuario;

        if (!userDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            })
        }else{
            usuario = userDB;
            usuario.google = true;
        }

        await usuario.save();

        //Generar el TOKEN
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        })
    }

    res.json({
        ok: true,
        msg: req.body.token
    })
}

module.exports = {
    login,
    googleSingIn
}