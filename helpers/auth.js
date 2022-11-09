import jwt from 'jsonwebtoken';


export function generateJWT( uid ) {
    return new Promise((resolve, reject) => {
        try {
            const payload = { uid };
            /** Generar el JWT */
            jwt.sign( payload, process.env.SECRET_KEY, {
                expiresIn: '10h'
            }, (error, token) => {
                if ( error ) {
                    console.log(error);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            }  );

        } catch (error) {
            console.log(error);
            reject('No se pudo generar el token');
        }
    });
}