import { CustomError } from './custom-errror';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'secret';

export function createToken(id: number, rememberMe?: boolean) {
  return jwt.sign({ userid: id }, JWT_SECRET, { expiresIn: rememberMe ? '7d' : '1d' }, { algorithm: 'RS256' });
}

export function authorize(token: string, id: number) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithm: 'RS256' });
    if (decoded.userid == id) {
      console.log('Operation authorized');
      return;
    }
    throw new CustomError('Operação não autorizada', 405, 'token inválido');
  } catch {
    throw new CustomError('Operação não autorizada', 405, 'token inválido');
  }
}
