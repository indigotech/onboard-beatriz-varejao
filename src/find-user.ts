import { User } from './entity/User';
import { AppDataSource } from './data-source';
import { CustomError } from './custom-errror';

export async function findingUser(email: string) {
  const firstUser = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', { email: email })
    .getOne();
  return firstUser;
}
export async function lastUser() {
  const cnt = await AppDataSource.getRepository(User).count();
  return cnt + 1;
}
export async function findUserById(id: number) {
  const idUser = await AppDataSource.getRepository(User).findOneBy({ id });
  if (idUser == null) {
    throw new CustomError('Usuário não encontrado', 404);
  }
  return idUser;
}
