import { CustomError } from './custom-errror';
import jwt from 'jsonwebtoken';

export function createToken(id: number, rememberMe?: boolean) {
  if (rememberMe) {
    return jwt.sign({ userid: id }, 'secret', { expiresIn: '7d' }, { algorithm: 'RS256' });
  }
  return jwt.sign({ userid: id }, 'secret', { expiresIn: '1d' }, { algorithm: 'RS256' });
}

export function authorize(token: string, id: number) {
  try {
    const decoded = jwt.verify(token, 'secret', { algorithm: 'RS256' });
    const now = Date.now() / 1000;
    if (decoded.userid == id && decoded.exp > now) {
      console.log('Operation authorized');
      return;
    }
    throw new CustomError('Operação não autorizada', 405, 'token inválido');
  } catch {
    throw new CustomError('Operação não autorizada', 405, 'token inválido');
  }
}
