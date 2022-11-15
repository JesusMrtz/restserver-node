import Product from '../models/Product.js';


export async function getAllProducts(request, response) {
    try {
        const { limit = 5, skip = 0 } = request.query;

        const [ total, products ] = await Promise.all([
            Product.countDocuments({ state: true }),
            Product.find({ state: true }).populate('category', 'name').populate('user', 'name').skip(skip).limit(limit)
        ]);

        return response.status(200).json({
            ok: true,
            total,
            products
        });
    } catch (error) {
       return response.status(500).json({
        ok: false,
        message: 'Hubo un error para obtener todos los productos',
        error
       });
    }
}

export async function getProduct(request, response) {
    try {
        const { id } = request.params;
        const product = await Product.findById(id).populate('category', 'name').populate('user', 'name');

        return response.status(200).json({
            ok: true,
            product
        });
    } catch (error) {
        return response.status(500).json({
            ok: true,
            message: 'Hubo un error para obtener el producto',
            error
           });
    }
}

export async function createProduct(request, response) {
    try {
        const { name, price, category_id, description } = request.body;
        const data = {
            name: name.toUpperCase(),
            price,
            description,
            category: category_id,
            user: request.authenticatedUser.id
        }
        
        const productDB = await Product.findOne({ name: data.name});

        if ( productDB ) {
            return response.status(400).json({
                ok: false,
                message: `El producto ${ data.name } ya existe`
            })
        }

        /** Guardar en la base de datos  */
        const product = new Product(data);
        await product.save();

        return response.status(201).json({
            ok: true,
            product,
            user: request.authenticatedUser
        });
    } catch (error) {
        return response.status(500).json({
            ok: true,
            message: 'Hubo un error al crear el producto',
            error
        });  
    }
}

export async function updatedProduct(request, response) {
    try {
        const { id } = request.params;
        const { name, price, category_id, description } = request.body;
        const data = {
            name: name?.toUpperCase(),
            price,
            description,
            category: category_id,
            user: request.authenticatedUser.id
        }
        
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

        const product = await Product.findByIdAndUpdate(id, data, { new: true }).populate('category', 'name').populate('user', 'name');
        return response.status(200).json({
            ok: true,
            product
        });
    } catch (error) {
        return response.status(500).json({
            ok: true,
            message: 'Hubo un error para actualizar el producto',
            error
           });
    }
}

export async function deletedProduct(request, response) {
    try {
        const { id } = request.params;
        /** Eliminado lógico  */
        const product = await Product.findByIdAndUpdate(id, { state: false });
    
        return response.json({
            ok: true,
            product,
            authenticatedUser: request.authenticatedUser
        }); 
    } catch (error) {
        return response.status(500).json({
            ok: true,
            message: 'Hubo un error para eliminar el producto',
            error
        });  
    }
}