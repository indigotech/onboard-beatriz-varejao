import { User } from './entity/User';
import { AppDataSource } from './data-source';
import { CustomError } from './custom-errror';

const repository = AppDataSource.getRepository(User);

export async function findUser(email: string): Promise<User> {
  const user = await repository.findOneBy({ email });
  if (!user) {
    throw new CustomError('Usuário não encontrado', 404);
  }
  return user;
}

export function countUsers(): Promise<number> {
  return repository.count();
}

export async function findUserById(id: number): Promise<User> {
  const idUser = await repository.findOneBy({ id });
  if (!idUser) {
    throw new CustomError('Usuário não encontrado', 404);
  }
  console.log(idUser);
  return idUser;
}
export async function listUsers(skip: number, limit: number) {
  return await repository.createQueryBuilder('user').skip(skip).take(limit).orderBy('user.name').getMany();
}
