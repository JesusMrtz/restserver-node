import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export async function validateJWT(request, response, next) {
    try {
        const token = request.header('Authorization');

        if ( !token ) return response.status(401).json({
            ok: false,
            message: 'No hay token en la petición'
        });

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(uid);

        if ( !user?.state ) return response.status(401).json({
            ok: false,
            message: 'Token no válido - Usuario deshabilitado'
        });

        request.authenticatedUser = user;
        next();
    } catch (error) {
       response.status(401).json({
        ok: false,
        message: 'Token no válido',
        error
       }) 
    }
}