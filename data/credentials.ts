import { Credentials } from '../types/Credentials';

export const STANDARD_USER: Credentials = {
  userName: `${process.env.STANDARD_USER_NAME}`,
  password: `${process.env.PASSWORD}`,
};

export const INVALID_USER: Credentials = {
  userName: 'invalid_user',
  password: 'invalid_password',
};
