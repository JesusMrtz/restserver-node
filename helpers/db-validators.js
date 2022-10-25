import Role from '../models/Role.js';
import User from '../models/User.js';


export async function validateRole( role ) {
    const existRole = await Role.findOne({ role });
    if ( !existRole ) throw new Error(`El rol ${ role } no está registrado en la base de datos`);
}

export async function userExistsInDB( id ) {
    const user = await User.exists({ _id: id });
    if ( !user ) throw new Error('El usuario no existe en la base de datos');
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