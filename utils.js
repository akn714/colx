const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_super_secret_key'; // move to .env in real projects

module.exports.errorHandler = function (err, req, res, next) {
    console.error('[-]', err.stack);
    res.status(500).json({ message: 'Something broke!' });
}

module.exports.log = (req, res, next) => {
    console.log('[+]', req.method, req.url);
    next();
}


module.exports.authorizeUser = (req, res, next) => {
    console.log('[+] authorizing user');
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.id = decoded.id; // assuming you encoded { id: user._id }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
