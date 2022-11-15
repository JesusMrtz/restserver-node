import bcrypt from 'bcryptjs';
import User from '../models/User.js';


export async function getAllUsers(request, response) {
    try {
        const { limit = 5, skip = 0 } = request.query;

        const [total, users] = await Promise.all([
            User.countDocuments({ state: true }),
            User.find({ status: true }).skip(skip).limit(limit)
        ])
    
        return response.json({
            ok: true,
            total,
            users
        });    
    } catch (error) {
        return response.status(500).json({
            ok: false,
            error
        });
    }
}

export async function createUser(request, response) {
    try { 
        const { name, email, password, role } = request.body;
        const user = new User({ name, email, password, role });
        
        /** Encriptar la contraseña */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    
        await user.save();
      
        return response.json({
            ok: true,
            message: 'POST API',
            user
        });  
    } catch (error) {
      return response.status(500).json({
        ok: false,
        error
      })  
    }
}

export async function updatedUser(request, response) {
    try {
        const { id } = request.params;
        const { password, google, ...rest } = request.body;

        if ( password ) {
            /** Encriptar la contraseña */
            const salt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync(password, salt);
        }

        const user = await User.findByIdAndUpdate( id, rest, { new: true } );
        return response.json({
            ok: true,
            user
        });  
    } catch (error) {
        return response.status(500).json({
            ok: false,
            error
        }); 
    }
}

export async function deletedUser(request, response) {
    try {
        const { id } = request.params;
        /** Eliminado lógico  */
        const user = await User.findByIdAndUpdate(id, { state: false });
    
        return response.json({
            ok: true,
            user,
            authenticatedUser: request.authenticatedUser
        });  
    } catch (error) {
        response.status(500).json({
            ok: false,
            error
        }); 
    }
}