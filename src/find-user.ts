import { User } from './entity/User';
import { AppDataSource } from './data-source';
import { CustomError } from './custom-errror';

const repository = AppDataSource.getRepository(User);

export async function findUser(email: string): Promise<User> {
  return await repository.findOneBy({ email });
}

export async function lastUser(): Promise<number> {
  const cnt = await repository.count();
  return cnt + 1;
}

export async function findUserById(id: number): Promise<User> {
  const idUser = await repository.findOneBy({ id });
  if (!idUser) {
    throw new CustomError('Usuário não encontrado', 404);
  }
  return idUser;
}
