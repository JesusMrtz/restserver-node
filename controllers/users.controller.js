export function getAllUsers(request, response) {
    return response.json({
        message: 'GET API'
    });
}

export function createUser(request, response) {
    const body = request.body;
  
    return response.json({
        message: 'POST API',
        body
    });
}

export function updatedUser(request, response) {
    const queryParams = request.query;

    console.log(queryParams);
    console.log(request.params.id);
    return response.json({
        message: 'PUT API',
        id: request.params.id,
        ...queryParams
    });
}

export function deletedUser(request, response) {
    const { id } = request.params;

    return response.json({
        message: 'DELETED API'
    });
}