const { ValidationError } = require('yup');

/**
 * Permet de générer les messages d'erreurs sur base de la validation 'yup'
 * @param {ValidationError} validationError 
 * @returns {object} 
 */
const getErrorMessage = (validationError) => {
    const results = validationError.inner.reduce((errors, current) => {
        const { path, message } = current;
        if (!errors[path]) {
            errors[path] = message;
        }
        return errors;
    }, {});

    return results;
};

module.exports = {
    getErrorMessage
};