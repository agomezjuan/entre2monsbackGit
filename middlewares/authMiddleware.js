const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, 'secretKey', (err, authData) => {
      if (err) {
        res.sendStatus(403); 
        req.authData = authData;
        next();
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

module.exports = verifyToken