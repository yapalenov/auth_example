export const errorHandlerDecorator = (ctrl) => async (req, res, next) => {
  try {
    await ctrl(req, res, next);
  } catch (e) {
    next(e);
  }
};
