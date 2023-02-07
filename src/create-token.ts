import { CustomError } from './custom-errror';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'secret';

export function createToken(id: number, rememberMe?: boolean) {
  return jwt.sign({ userid: id }, JWT_SECRET, { expiresIn: rememberMe ? '7d' : '1d' }, { algorithm: 'RS256' });
}

export function authorize(token: string) {
  try {
    jwt.verify(token, JWT_SECRET, { algorithm: 'RS256' });
    console.log('Operation authorized');
    return;
  } catch {
    throw new CustomError('Operação não autorizada', 401, 'token inválido');
  }
}
