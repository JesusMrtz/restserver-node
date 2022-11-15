import { isValidObjectId } from "mongoose";
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';


const collections = [
    'users',
    'categories',
    'products'
]

export async function globalSearch(request, response) {
    try {
        const { collection, param } = request.params;
        let results = {
            ok: true
        };

        if ( !collections.includes(collection.toLowerCase().trim()) ) {
            return response.status(400).json({
                ok: false,
                message: `La colección ${ collection } no es válido`
            });
        }
       


        switch ( collection.toLowerCase().trim() ) {
            case 'users':
                const users = await searchUsers(param);
                results.results = { users };
                break;
            case 'categories':
                const categories = await searchCategories(param);
                results.results = { categories }
                break;
            case 'products':
                const products = await searchProducts(param);
                results.results = { products }
                break;
        }

        return response.status(200).json(results);
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Hubo un error en el buscador',
            error
        });
    }
}

export async function searchUsers(param) {
    const isMongoId = isValidObjectId(param);

    if ( isMongoId ) {
        const user = await User.findOne({ id: param, state: true });
        return [ user ]
    }

    const regex = new RegExp(param, 'i');

    const users = await User.find({
        $or: [ { name: regex }, { email: regex } ],
        $and: [{ state: true }]
    });

    return users
}

export async function searchCategories(param) {
    const isMongoId = isValidObjectId(param);

    if ( isMongoId ) {
        const category = await Category.findOne({ id: param, state: true }).populate('user', 'name');
        return [ category ];
    }

    const regex = new RegExp(param, 'i');

    const users = await Category.find({
        $or: [ { name: regex } ],
        $and: [{ state: true }]
    }).populate('user', 'name');

    return users
}

export async function searchProducts(param) {
    const isMongoId = isValidObjectId(param);

    if ( isMongoId ) {
        const product = await Product.findOne({ id: param, state: true }).populate('category', 'name').populate('user', 'name');
        return [ product ];
    }

    const regex = new RegExp(param, 'i');

    const products = await Product.find({
        $or: [ { name: regex }, { description: regex }, { category: regex }, { availabe: regex } ],
        $and: [{ state: true }]
    }).populate('user', 'name');

    return products;
}