import { Schema, model } from "mongoose";


const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'Rol no seleccionado'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/**
 * 
 * @returns Removemos la propiedad password y __v al enviar el usuario en todos los metodos que utilicen el model User a nivel global
 */
userSchema.methods.toJSON = function() {
    const { password, __v, _id: uid, ...user } = this.toObject();
    return {
        uid,
        ...user
    };
}


export default model('users', userSchema);