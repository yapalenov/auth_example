import { errorHandlerDecorator } from './decorators/errorHandler.decorator';

async function greeting(req, res) {
  const { user } = req;
  await res.json({ msg: 'Hello from protected', user });
}

export const greetingController = {
  greeting: errorHandlerDecorator(greeting)
};
