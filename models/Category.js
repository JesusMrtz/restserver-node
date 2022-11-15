import { Schema, model } from 'mongoose';


const categorySchema = Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Agregue un usario a la categoría']
    }
});

/**
 * 
 * @returns Removemos la propiedad password y __v al enviar el usuario en todos los metodos que utilicen el model User a nivel global
 */
 categorySchema.methods.toJSON = function() {
    const {  __v, state, ...data } = this.toObject();
    return data;
}


export default model('categories', categorySchema);