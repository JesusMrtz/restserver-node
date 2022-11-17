import User from '../models/User.js';
import Product from "../models/Product.js";

export function validateUploadedFile(request, response, next) {
    if ( !request.files || Object.keys(request.files).length === 0 ) {
        return response.status(400).json({
            ok: false,
            message: 'No hay archivos que subir'
        });
    }

    next();
}

export async function validateModels(request, response, next) {
    const { collection, id } = request.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.exists({ _id: id, state: true });
            break;
        case 'products':
            model = await Product.exists({ _id: id, state: true });
            break;
    }

    if ( !model ) return response.status(400).json({
        ok: false,
        message: `No existe la colección ${ collection } con el ID ${ id }`
    });

    next();
}

export async function getModelById(collection, id) {
    let model;

    if (collection === 'users') {
        model = await User.findById(id)
    } else if ( collection === 'products' ) {
        model = await Product.findById(id);
    }
    
    return model;
}