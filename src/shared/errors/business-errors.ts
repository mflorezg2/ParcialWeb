export enum BusinessError {
  INVALID_EMAIL = 'INVALID_EMAIL',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_LOCKED = 'USER_LOCKED',
  ROLE_NAME_REQUIRED = 'ROLE_NAME_REQUIRED',
  ROLE_ALREADY_EXISTS = 'ROLE_ALREADY_EXISTS',
  INVALID_ROLES = 'INVALID_ROLES',
  TOKEN_INVALID = 'TOKEN_INVALID',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ERROR_LISTING_USERS = 'ERROR_LISTING_USERS',
  ERROR_FETCHING_ROLES = 'ERROR_FETCHING_ROLES',
}

export class BusinessLogicException extends Error {
  constructor(message: string, public type: BusinessError) {
    super(message);
    this.name = 'BusinessLogicException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}