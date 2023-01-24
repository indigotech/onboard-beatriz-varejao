import { setupServer } from '../server';
import axios from 'axios';
import { expect } from 'chai';

describe('Query hello', () => {
  before(async () => {
    await setupServer();
  });
  it('should return Hello world', async () => {
    const url = 'http://localhost:4000/';
    const query = 'query { hello }';
    const response = await axios.post(url, { query });
    console.log(response.data);
    expect(response.data).to.eql({ data: { hello: 'Hello world!' } });
  });
});
