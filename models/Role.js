import { model, Schema } from "mongoose";


const roleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El role es requerido'],
    }
});


export default model('roles', roleSchema);