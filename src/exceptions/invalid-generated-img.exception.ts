export class InvalidImageGenerateException extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, InvalidImageGenerateException.prototype);
  }
}
