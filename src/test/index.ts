import { setupServer } from '../server';
import axios from 'axios';
import chai from 'chai';

describe('Query hello', () => {
  before(async () => {
    console.log('entrou');
    await setupServer();
  });
  it('query', async () => {
    console.log('entrou2');
    const url = 'http://localhost:4000/';
    const query = 'query { hello }';
    const response = await axios.post(url, { query });
    console.log(response.data);
    chai.expect(response.data).to.eql({ data: { hello: 'Hello world!' } });
  });
});
