import Product from "../models/Product.js";

export async function productExistsInDB( id ) {
    const product = await Product.exists({ _id: id, state: true });
    if ( !product ) throw new Error('El producto no existe en la base de datos');
}