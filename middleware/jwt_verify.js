const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
    if (err) {
      res.status(400).json({ success: false, error: "Unauthroized Access" });
    } else {
      const decoded = decode(token)
      next()
      return decoded
    }

  }) 
}
module.exports = authenticateToken