// function to handle the custom errors
// when we don't have and error in the system but, we want to add the error

const customError = (statusCode, message) => {
    const err = new Error();
    err.statusCode = statusCode;
    err.message = message;
    return err;
}

export default customError;