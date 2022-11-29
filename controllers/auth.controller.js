import bcrypt from 'bcryptjs';
import { generateJWT, googleVerify } from '../helpers/auth.js';
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

export async function googleSignIn(request, response) {
    try {
        const { id_token } = request.body;
        const { email, picture, name } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if ( !user ) {
          const data = {
              name, email,
              image: picture,
              google: true,
              role: 'USER_ROLE',
              password: ':p'
          };
      
          user = new User(data);
          await user.save();
        }

        if ( !user.state ) {
            return response.status(401).json({
                ok: false,
                message: 'Hable con el administrador, usuario bloqueado.'
            });
        }


        /** Generar el JWT  */
        const token = await generateJWT(user.id);
        response.json({
            ok: true,
            token,
            user
        });
    } catch (error) {
        response.status(500).json({
            ok: false,
            message: 'Error al iniciar sesión con google',
            error
        })
    }
}

export async function refreshToken(request, response) {
    try {
        const { authenticatedUser } = request;

        /** Generar el token */
        const token = await generateJWT(authenticatedUser.id);
    
        return response.status(200).json({
            ok: true,
            user: authenticatedUser,
            token
        });   
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Hubo un error al renovar el token',
            error
        })
    }
}