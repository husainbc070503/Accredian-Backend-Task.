const AuthMiddleware = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        const err = {
            status: 400,
            message: error.issues[0].message
        }
        next(err);
    }
}

module.exports = AuthMiddleware;