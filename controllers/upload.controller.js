import { deletedImage, deletedImageToCloudinary, existImage, showNoImage, uploadImage, uploadImageToCloudinary } from '../helpers/upload-files.js';
import { getModelById } from '../middlewares/validate-file.js';


export async function loadFile(request, response) {
    try {
        const completedPath = await uploadImage(request.files); 
        return response.status(200).json({
            ok: true,
            message: `Archivo subido correctamenta al path: ${ completedPath }`
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Error al subir el archivo',
            error
        });
    }
}

export async function uploadFile(request, response) {
    try {
        const { collection, id } = request.params;
        
        let model = await getModelById(collection, id);
        deletedImage(model.image);

        model.image = await uploadImage(request.files);
        model.save();

        return response.status(200).json({
            ok: true,
            model
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Error al actualizar el archivo',
            error
        });
    }
}

export async function uploadCloudinaryFile(request, response) {
    try {
        const { collection, id } = request.params;
        let model = await getModelById(collection, id);

        await deletedImageToCloudinary(model.image);
        model.image = await uploadImageToCloudinary(request.files.file);
        model.save();

        return response.status(200).json({
            ok: true,
            model
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Error al actualizar el archivo',
            error
        });
    }
}

export async function showImage(request, response) {
    try {
        const { id, collection } = request.params;
        let model = await getModelById(collection, id);

        if ( existImage(model.image) ) return response.sendFile( model.image );
        return response.sendFile( showNoImage() );
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Error al mostrar la imagen',
            error
        });
    }
}