function asyncWrapper(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = asyncWrapper