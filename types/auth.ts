export interface AuthData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export type AuthMode = 'login' | 'signup' | 'resetPassword';
