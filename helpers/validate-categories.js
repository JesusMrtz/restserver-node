import Category from "../models/Category.js";


export async function categoryExistsInDB( id ) {
    const category = await Category.exists({ _id: id, state: true });
    if ( !category ) throw new Error('La categoria no existe en la base de datos');
}