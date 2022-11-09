export function hasRole(...roles) {
    return (request, response, next) => {
        const { role, name } =  request.authenticatedUser;
        if ( !roles.includes(role) ) return response.status(401).json({
            ok: false,
            message: `El ${ name } no tiene permisos`,
            roles
        });
    
        next();
    }
} 