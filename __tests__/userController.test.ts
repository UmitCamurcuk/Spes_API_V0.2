import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';
import connectDB from '../config/db';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });
let token: string;
beforeAll(async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not defined.");
    }
    await connectDB(); 
    const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ username: 'umit.camurcuk', password: '123456' });
    
    token = loginResponse.body.token; 
});

afterAll(async () => {
    await mongoose.connection.close(); 
});

describe('POST /api/users/getUser', () => {
    it('should return a user when valid body parameters are provided', async () => {
        const response = await request(app)
            .post('/api/users/getUser')
            .set('Authorization', `${token}`)
            .send({ username: 'umit.camurcuk' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'umit.camurcuk');
    },20000);

     it('should return 404 if no user is found', async () => {
         const response = await request(app)
             .post('/api/users/getUser')
             .set('Authorization', `${token}`)
             .send({ username: 'nonexistentuser' });

         expect(response.status).toBe(404);
         expect(response.body).toHaveProperty('message', 'Kullanıcı bulunamadı');
     },20000);

     it('should return 400 if no body parameters are provided', async () => {
         const response = await request(app).post('/api/users/getUser').set('Authorization', `${token}`).send({});
         expect(response.status).toBe(400);
         expect(response.body).toHaveProperty('message', 'En az bir sorgu parametresi belirtmelisiniz.');
     },20000);
});


describe('GET /api/users/getUsers', () => {
    it('should return a user when valid body parameters are provided', async () => {
        const response = await request(app)
            .get('/api/users/getUsers')
            .set('Authorization', `${token}`)

        expect(response.status).toBe(200);
    },20000);

});