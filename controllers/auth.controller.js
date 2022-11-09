import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/auth.js';
import User from '../models/User.js';


export async function login(request, response) {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email, state: true });

        if ( !user ) return response.status(400).json({
            ok: false,
            message: 'Contraseña y/o Password no son correctos'
        });

        const validPassword = bcrypt.compareSync( password, user?.password );

        if ( !validPassword ) return response.status(400).json({
            ok: false,
            message: 'Contraseña y/o Password no son correctos'
        });

        /** Generar el token */
        const token = await generateJWT(user.id);

        response.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        response.status(500).json({
            ok: true,
            message: 'Error en el servidor',
            error
        })
    }
}