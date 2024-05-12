import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Create', () => {

  it('Cria registro', async () => {
    const rest1 = await testServer
      .post('/cidades')
      .send({ nome: 'São Paulo' });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof rest1.body).toEqual('number');
  });
  it('Não pode criar um registro com nome muito curto', async () => {
    const rest1 = await testServer
      .post('/cidades')
      .send({ nome: 'ca' });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.nome');
  });
});