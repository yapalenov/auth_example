import { HttpError } from '../../middlewares/error.middleware';

export const dtoValidatorDecorator = (ctrl, dto) => async (req, res, next) => {
  try {
    await dto.validateAsync(req.body);
  } catch (err) {
    throw new HttpError(422, err.message);
  }
  await ctrl(req, res, next);
};
