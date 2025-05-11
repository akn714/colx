const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Users = require('./models/Users.model');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // move to .env in real projects

module.exports.errorHandler = function (err, req, res, next) {
  console.error('[-]', err.stack);
  res.status(500).json({ message: 'Something broke!' });
}

module.exports.log = (req, res, next) => {
  console.log('[+]', req.method, req.url);
  next();
}

module.exports.authorizeUser = async (req, res, next) => {
  console.log('[+] authorizing user');
  // const id = is_user_authentic(req.cookies.token);

  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).json({ error: 'Unauthorized: No token provided' });
  // }

  // const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const id = payload.id;
    // if (!id) return res.status(404).json({ message: 'Invalid Token!' });
    
    const user = await Users.findById(id);
    if(!user) return res.status(404).json({ message: 'User not found' });

    req.id = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
