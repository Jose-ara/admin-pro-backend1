const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {


        const playload = {
            uid
        }

        jwt.sign(playload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se generó el JWT');
            }else{
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT
}