import jwt from 'jsonwebtoken';

const secret = 's3cr3t';

const authenticateJwt = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token!' });
  }

  const splitToken = token.split(' ');
  const jwtToken = splitToken[1];

  jwt.verify(jwtToken, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    } else {
      // Store the decoded token data in the request object for further use if needed
      req.user = decoded;
      next();
    }
  });
};

export { authenticateJwt, secret };
