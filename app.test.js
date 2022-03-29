/* eslint-disable */

import mongoose from 'mongoose';
import supertest from 'supertest';

import { app } from './app.mjs';
import { DB } from './config/index.mjs';

describe('app', () => {
  let token = '';

  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(DB.MONGO_CONNECTION_STR);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /api/auth/login', () => {
    it('POST: when the request is valid', async () => {
      const response = await supertest(app)
        .post('/api/auth/login')
        .send({ email: 'akhrorbek20011707@gmail.com', password: 'key12345' });

      token = response.body.token;

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User successfully logged in');
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

    it('POST: when the request is not valid', async () => {
      const response = await supertest(app)
        .post('/api/auth/login')
        .send({ email: 'akhrorbek20011707@gmail.com' });

      expect(response.status).toBe(500);
      expect(response.body.err).toBe('data and hash arguments required');
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

    it('POST: when user is not found', async () => {
      const response = await supertest(app)
        .post('/api/auth/login')
        .send({ email: 'akhrorbek20011707@gmail.com', password: 'key123456' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unathorized');
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });
  });

  describe('GET /api/transactions', () => {
    it('GET Get all transactions', async () => {
      const response = await supertest(app)
        .get('/api/transactions')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

    it('GET Get all transactions when unauthorized', async () => {
      const response = await supertest(app)
        .get('/api/transactions');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/transactions', () => {
    it('add transaction when user authorized and request is valid', async () => {
      const response = await supertest(app)
        .post('/api/transactions')
        .send({
          type: 'income',
          title: 'lottery',
          accountId: '6232f6ac2d24d58408de0045',
          amount: '5000',
          category: '62333e9f6bf4467438cda6cd',
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('transaction added successfully');
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

    it('POST add transaction when user authorized and request is not valid', async () => {
      const response = await supertest(app)
        .post('/api/transactions')
        .send({
          type: 'income',
          title: 'lottery',
          accountId: '6232f6ac2d24d58408de0045',
          amount: '5000',
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect(response.body.err).toBe('transactions validation failed: category: transaction category must be entered');
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

    it('POST add transaction when user unauthorized', async () => {
      const response = await supertest(app)
        .post('/api/transactions')
        .send({
          type: 'income',
          title: 'lottery',
          accountId: '6232f6ac2d24d58408de0045',
          amount: '5000',
          category: '62333e9f6bf4467438cda6cd',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/accounts', () => {
    it('GET Get all accounts', async () => {
      const response = await supertest(app)
        .get('/api/accounts')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

    it('GET Get all accounts when unauthorized', async () => {
      const response = await supertest(app)
        .get('/api/accounts');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/accounts', () => {
    it('add account when user authorized and request is valid', async () => {
      const response = await supertest(app)
        .post('/api/accounts')
        .send({
          title: 'visa',
          currencyId: '62332d996bf4467438cda6b5',
          description: 'for global incomes and expenses',
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('account added successfully');
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

    it('POST add account when user authorized and request is not valid', async () => {
      const response = await supertest(app)
        .post('/api/accounts')
        .send({
          title: 'visa',
          description: 'for global incomes and expenses',
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect(response.body.err).toBe('accounts validation failed: currencyId: account must have a currency');
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

    it('POST add account when user unauthorized', async () => {
      const response = await supertest(app)
        .post('/api/accounts')
        .send({
          title: 'visa',
          currencyId: '62332d996bf4467438cda6b5',
          description: 'for global incomes and expenses',
        });
      expect(response.status).toBe(401);
    });
  });
});
/* eslint-disable */