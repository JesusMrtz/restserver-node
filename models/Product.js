import { Schema, model } from 'mongoose';


const productSchema = Schema({
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
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: [true, 'Agregue una categoría al producto']
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
 productSchema.methods.toJSON = function() {
    const {  __v, state, ...data } = this.toObject();
    return data;
}


export default model('products', productSchema);