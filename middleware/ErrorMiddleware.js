const ErrorMiddleware = (err, req, res, next) => {
    const status = err.status || 400;
    const message = err.message || 'BACKEND ERROR';
    res.status(status).json({ message });
}

module.exports = ErrorMiddleware;