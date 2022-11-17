import path from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function uploadImage(files) {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const name = file.name.split('.');
        const extension = name[name.length - 1];

        // Validar la extensión
        if ( !validImageExtension(extension) ) return reject(`La extensión ${ extension } no está permitida`);
        
        const baseDir = path.join(__dirname, '../uploads/');
        verifyAndCreateFolder(baseDir);
        
        const temporalName = `${ uuid() }.${ extension }`;
        const uploadPath = path.join( baseDir, temporalName );
        file.mv(uploadPath, (error) => {
            if (error) return reject('Error al subir el archivo');
            return resolve(uploadPath);
        });
    });
}

export function deletedImage(imagePath) {
    existImage(imagePath) && unlinkSync(imagePath);
}

export async function uploadImageToCloudinary(image) {
    console.log('Wey')
    console.log(image)
    const { tempFilePath } = image  ;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    return secure_url;
}

export async function deletedImageToCloudinary(image) {
    if (image) {
        const imagePath = image.split('/');
        const [nameImage] = imagePath[imagePath.length - 1].split('.');
        await cloudinary.uploader.destroy(nameImage);
    }
}

export function existImage(imagePath) {
    return imagePath ? existsSync(imagePath) : false;
}

export function showNoImage() {
    return path.join(__dirname, '../assets', 'no-image.jpg');
}

function verifyAndCreateFolder(baseDir) {
    let foldersName = baseDir.split('\\');

    if ( foldersName && foldersName.length > 0 ) {
        let joinPath = [];
        foldersName.forEach(folderName => {
            joinPath.push(folderName);
            let path = joinPath.join('/');

            if( !existsSync(path)  ) {
                mkdirSync(path);
            }
        });
    }
}

function validImageExtension(extension) {
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];
    return !validExtension.includes(extension.toLowerCase()) ? false : true;
}