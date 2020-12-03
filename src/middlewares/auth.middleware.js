import { jwtService } from '../services/jwt.service';
import { HttpError } from './error.middleware';
import { User } from '../models/User';

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

export async function authMiddleware(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    throw new HttpError(401, 'Token is not provided');
  }
  try {
    const { id } = jwtService.decode(token);
    req.user = await User.findOne({ id });
  } catch (err) {
    throw new HttpError(401, err.message);
  }
  next();
}
