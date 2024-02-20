export default class UserError extends Error {
  type: string | undefined;
  status: number;
  mainError: any;

  // Sometimes it is helpful to send a validation error on the route or models
  // this key helps with that
  validationError: object | undefined;

  constructor (
    message: string,
    status = 500,
    type: string | undefined = undefined,
    error = undefined,
    validationError?: object,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.type = type;
    this.mainError = error;
    this.validationError = validationError;
    if (error) console.log('Error in UserError: ', error);

    if (status === 500 || error) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
