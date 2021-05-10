export class GenericError extends Error {
  constructor(message: string) {
    super()
    this.message = message
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400
    }
    if (this instanceof NotFound) {
      return 404
    }
    if (this instanceof Unauthorized) {
      return 401
    }
    return 500
  }
}

export class BadRequest extends GenericError {}
export class NotFound extends GenericError {}
export class Unauthorized extends GenericError {}
