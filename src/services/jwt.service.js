import jwt from 'jsonwebtoken';

function sign(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: +process.env.ACCESS_TOKEN_LIFE
  });
}

function verify(accessToken) {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
}

function decode(accessToken) {
  return jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
}

export const jwtService = {
  sign,
  verify,
  decode
};
