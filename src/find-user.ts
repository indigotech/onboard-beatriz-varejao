import { User } from './entity/User';
import { AppDataSource } from './data-source';
import { CustomError } from './custom-errror';

const repository = AppDataSource.getRepository(User);

export async function findUser(email: string): Promise<User> {
  const user = await repository.findOne({
    where: {
      email,
    },
    relations: {
      address: true,
    },
  });
  if (!user) {
    throw new CustomError('Usuário não encontrado', 404);
  }
  return user;
}

export function countUsers(): Promise<number> {
  return repository.count();
}

export async function findUserById(id: number): Promise<User> {
  const idUser = await repository.findOne({
    where: {
      id,
    },
    relations: {
      address: true,
    },
  });
  if (!idUser) {
    throw new CustomError('Usuário não encontrado', 404);
  }
  return idUser;
}

export async function listUsers(skip: number, limit: number) {
  return repository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.address', 'address')
    .skip(skip)
    .take(limit)
    .orderBy('user.name')
    .getMany();
}
