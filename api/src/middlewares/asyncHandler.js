const asyncHandler = (fn) => (req, res, next) => {
    try {
        Promise.resolve(fn(req, res, next));
    } catch (err) { 
        console.error(err);
        next(err);
    }
}


export default asyncHandler;