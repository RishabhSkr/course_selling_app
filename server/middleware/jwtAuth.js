import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_SECRET_ADMIN,JWT_SECRET_SUPER} from '../config.js';

const authenticateJwt = (requiredRole) => (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or invalid!' });
  }
  
  const jwtToken = token.split(' ')[1];
  
  // Choose the correct secret based on the role
  const secret = requiredRole === 'superuser' ? 
      JWT_SECRET_SUPER : requiredRole === 'admin' ? 
      JWT_SECRET_ADMIN : JWT_SECRET;

  jwt.verify(jwtToken, secret, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err); // Debugging log
      return res.status(401).json({ message: 'Unauthorized: Token verification failed!' });
    }

    // Store the decoded token data in the request object
    req.user = decoded;
    next();
  });
};

export { authenticateJwt };
