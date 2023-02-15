import { expect } from 'chai';
import { Address } from '../entity/Address';
import { createdAddress, queryBase, createRepositoryUser, createRepositoryAddress } from './input';
import { createToken } from '../create-token';
import { AppDataSource } from '../data-source';

describe('Testing createAdress', () => {
  it('should create an adress and return it', async () => {
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    await createRepositoryUser(input);
    const token = createToken(0, true);
    const address = {
      CEP: '09030-010',
      street: 'rua X',
      streetNumber: '121',
      complement: 'ap22',
      neighborhood: 'bairro a',
      city: 'cidade das esmeraldas',
      state: 'ww',
    };
    const variables = {
      address,
      email: input.email,
    };
    const response = await queryBase(createdAddress, variables, token);
    const addressRepo = await AppDataSource.getRepository(Address).findOne({
      where: {
        CEP: address.CEP,
      },
      relations: {
        user: true,
      },
    });
    expect(response.data.data.createAddress).to.be.deep.eq({
      id: `${addressRepo.id}`,
      CEP: addressRepo.CEP,
      street: addressRepo.street,
      streetNumber: addressRepo.streetNumber,
      complement: addressRepo.complement,
      neighborhood: addressRepo.neighborhood,
      city: addressRepo.city,
      state: addressRepo.state,
      user: {
        birthDate: addressRepo.user.birthDate,
        email: addressRepo.user.email,
        id: `${addressRepo.user.id}`,
        name: addressRepo.user.name,
      },
    });
  });

  it('should create 2 adresses from one user and return it', async () => {
    const input = {
      name: 'eu',
      email: 'eu@gmail.com',
      birthDate: '27/12/1900',
      password: 'mudar123',
    };
    await createRepositoryUser(input);
    const token = createToken(0, true);
    const address = {
      CEP: '09030-010',
      street: 'rua X',
      streetNumber: '121',
      complement: 'ap22',
      neighborhood: 'bairro a',
      city: 'cidade das esmeraldas',
      state: 'ww',
    };
    await createRepositoryAddress(address, input.email);
    const address2 = {
      CEP: '04119-903',
      street: 'rua W',
      streetNumber: '33',
      complement: 'ap11',
      neighborhood: 'bairro b',
      city: 'cidade dos jasmins',
      state: 'xx',
    };
    const variables2 = {
      address: address2,
      email: input.email,
    };
    const response2 = await queryBase(createdAddress, variables2, token);
    const addressRepo2 = await AppDataSource.getRepository(Address).findOne({
      where: {
        CEP: address2.CEP,
      },
      relations: {
        user: true,
      },
    });
    expect(response2.data.data.createAddress).to.be.deep.eq({
      id: `${addressRepo2.id}`,
      CEP: addressRepo2.CEP,
      street: addressRepo2.street,
      streetNumber: addressRepo2.streetNumber,
      complement: addressRepo2.complement,
      neighborhood: addressRepo2.neighborhood,
      city: addressRepo2.city,
      state: addressRepo2.state,
      user: {
        birthDate: addressRepo2.user.birthDate,
        email: addressRepo2.user.email,
        id: `${addressRepo2.user.id}`,
        name: addressRepo2.user.name,
      },
    });
  });

  it('should return user not found', async () => {
    const token = createToken(0, true);
    const address = {
      CEP: '09030-010',
      street: 'rua X',
      streetNumber: '121',
      complement: 'ap22',
      neighborhood: 'bairro a',
      city: 'cidade das esmeraldas',
      state: 'ww',
    };
    const variables = {
      address,
      email: 'eu@gmail.com',
    };
    const response = await queryBase(createdAddress, variables, token);
    expect(response.data).to.be.eql({
      errors: [{ message: 'Usuário não encontrado', code: 404 }],
      data: { createAddress: null },
    });
  });
});
