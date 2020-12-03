import { User } from '../models/User';
import { passwordService } from '../services/password.service';
import { HttpError } from '../middlewares/error.middleware';
import { jwtService } from '../services/jwt.service';
import Joi from 'joi';
import { errorHandlerDecorator } from './decorators/errorHandler.decorator';
import { dtoValidatorDecorator } from './decorators/dtoValidator.decorator';

const loginDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, 'User not found');
  }

  const passwordIsCorrect = await passwordService.comparePassword(
    password,
    user.password
  );

  if (!passwordIsCorrect) {
    throw new HttpError(401, 'Unauthenticated');
  }

  const accessToken = jwtService.sign({ id: user.id });

  await res.json({ accessToken });
}

export const authController = {
  login: errorHandlerDecorator(dtoValidatorDecorator(login, loginDto))
};
