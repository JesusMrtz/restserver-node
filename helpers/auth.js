import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';


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

export async function googleVerify(token) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { name, picture, email } = ticket.getPayload();
    return {
        name,
        picture,
        email
    }
}