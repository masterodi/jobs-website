import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';

export class BaseError extends Error {
  constructor(message: string) {
    super(message);
  }

  static maybeFromFirebase(e: unknown) {
    if (!(e instanceof FirebaseError)) {
      throw e;
    }

    if (e.code === AuthErrorCodes.INVALID_EMAIL) {
      throw new BaseError('Invalid email address');
    }

    if (e.code === AuthErrorCodes.INVALID_PASSWORD) {
      throw new BaseError('Invalid password');
    }

    if (e.code === 'auth/missing-password') {
      throw new BaseError('Missing password');
    }

    if (e.code === AuthErrorCodes.WEAK_PASSWORD) {
      throw new BaseError('Weak password');
    }

    if (e.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      throw new BaseError('Invalid credentials');
    }

    if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
      throw new BaseError('Email already used');
    }
  }
}

export class ValidationError<T> extends BaseError {
  details?: T;

  constructor(message: string, details?: T) {
    super(message);
    this.details = details;
  }
}
