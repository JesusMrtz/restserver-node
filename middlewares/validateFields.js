import { validationResult } from "express-validator";


export function validateFields(request, response, next) {
    const errors = validationResult(request);

    if ( !errors.isEmpty() ) {
        return response.status(400).json({
            ok: false,
            ...errors
        });
    }


    next();
}