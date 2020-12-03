import bcrypt from 'bcrypt';

const saltRounds = +process.env.PASSWORD_SALT_ROUNDS || 10;

async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export const passwordService = {
  hashPassword,
  comparePassword
};
