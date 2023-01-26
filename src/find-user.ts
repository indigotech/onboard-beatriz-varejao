import { User } from './entity/User';
import { AppDataSource } from './data-source';

export async function findingUser(email: string) {
  const firstUser = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', { email: email })
    .getOne();
  return firstUser;
}
