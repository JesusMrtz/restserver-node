import Role from '../models/Role.js';
import User from '../models/User.js';
import Category from "../models/Category.js";
import Product from "../models/Product.js";


export async function validateRole( role ) {
    const existRole = await Role.findOne({ role });
    if ( !existRole ) throw new Error(`El rol ${ role } no está registrado en la base de datos`);
    return true
}

export async function userExistsInDB( id ) {
    const user = await User.exists({ _id: id, state: true });
    if ( !user ) throw new Error('El usuario no existe en la base de datos');
    return true
}

export async function categoryExistsInDB( id ) {
    const category = await Category.exists({ _id: id, state: true });
    if ( !category ) throw new Error('La categoria no existe en la base de datos');
    return true
}

export async function productExistsInDB( id ) {
    const product = await Product.exists({ _id: id, state: true });
    if ( !product ) throw new Error('El producto no existe en la base de datos');
}

export async function allowedCollections(collection, collections) {
    const includedCollection = collections.includes(collection);
    if ( !includedCollection ) throw new Error(`La colección ${ collection } no es permitida`);
    return true;
}

export async function updateEmail( id, email ) {
    const user = await User.findById(id);
    const existEmail = await User.findOne({ email });
    if  ( user._id.equals(existEmail._id) ) throw new Error('Escriba un correo único'); 
}

export async function validateEmail( email ) {
    await isEmailRequired( email );
    await isAnEmail( email );
    await isEmailUnique( email );
}

export async function isEmailRequired( email ) {
    if ( !email ) throw new Error (`El correo es requrido`);
}


export async function isAnEmail( email ) {
    if ( !(/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) ) throw new Error(`El formato del correo ${ email } no es válido`);
}


export async function isEmailUnique( email ) {
    /** Verificar si el correo existe */
    const existEmail = await User.findOne({ email });
    if ( existEmail ) throw new Error(`El correo ${ email } ya se encuentra registrado`);
}