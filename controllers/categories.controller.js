import Category from '../models/Category.js';


export async function getAllCategories(request, response) {
    try {
        const { limit = 5, skip = 0 } = request.query;

        const [ total, categories ] = await Promise.all([
            Category.countDocuments({ state: true }),
            Category.find({ state: true }).populate('user', 'name').skip(skip).limit(limit)
        ]);
        
        return response.status(200).json({
            ok: true,
            total,
            categories
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Hubo un error al obtener las categorias',
            error
        });
    }
}

export async function getCategory(request, response) {
    try {
        const { id } = request.params;
        const category = await Category.findById(id).populate('user', 'name');

        return response.status(200).json({
            ok: true,
            category
        })
    } catch (error) {
      return response.status(500).json({
        ok: false,
        message: 'Error al obtener la categoría',
        error
      })  
    }
}

export async function createCategory(request, response) {
    try {
        const name = request.body.name.toUpperCase();
        const categoryDB = await Category.findOne({ name });
       
        if( categoryDB ) {
            return response.status(400).json({
                ok: false,
                message: `La categoria ${ name } ya existe`
            });
        }

        /** Guardar en base de datos  */
        const data = {
            name,
            user: request.authenticatedUser.id
        };

        const category = new Category(data);
        await category.save(); 

        return response.status(201).json({
            ok: true,
            category
        })
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Hubo un error al crear la categoría',
            error
        });
    }
}

export async function updatedCategory(request, response) {
    try {
        const { id } = request.params;
        const { name } = request.body;

        const category = await Category.findByIdAndUpdate(id, { name: name.toUpperCase(), user: request.authenticatedUser._id }, { new: true }).populate('user', 'name');
        return response.status(200).json({
            ok: true,
            category
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Hubo un error al actualizar la categoría',
            error
        }); 
    }
}

export async function deletedCategory(request, response) {
    try {
        const { id } = request.params;
        /** Eliminado lógico  */
        const category = await Category.findByIdAndUpdate(id, { state: false });
    
        return response.json({
            ok: true,
            category,
            authenticatedUser: request.authenticatedUser
        });  
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Hubo un error al eliminar la categoría',
            error
        }); 
    }
}