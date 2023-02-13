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

export async function count(): Promise<number> {
  const cnt = await repository.count();
  return cnt;
}

export async function findUserById(id: number): Promise<User> {
  const idUser = await repository.findOneBy({ id });
  if (!idUser) {
    throw new CustomError('Usuário não encontrado', 404);
  }
  return idUser;
}
<<<<<<< HEAD
export async function listUsers(limit: number) {
  return AppDataSource.getRepository(User).createQueryBuilder('user').orderBy('user.name').take(limit).getMany();
=======
export async function listUsers(toSkip: number, toList: number) {
  const listUsers = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .skip(toSkip)
    .take(toList)
    .orderBy('user.name')
    .getMany();
  return listUsers;
>>>>>>> 8188a63 (pagination)
}
