export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export enum LoginLength {
  Min = 3,
  Max = 50,
}

export enum PasswordLength {
  Min = 6,
  Max = 12,
}

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
} as const;
