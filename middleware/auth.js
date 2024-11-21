const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication failed!' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, 'secretfortoken');
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed!' });
  }
};