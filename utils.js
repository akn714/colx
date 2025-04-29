module.exports.errorHandler = function (err, req, res, next) {
    console.error('[-]', err.stack);
    res.status(500).json({ message: 'Something broke!' });
}

module.exports.log = (req, res) => {
    console.log('[+]', req.method, req.url);
}
