import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../../app';

let connection: Connection;
describe('Create House Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    it('should be able to create a new house', async () => {
        const response = await request(app).post('/houses').send({
            name: 'House Test',
            region: 'Region Test',
            founded_in: 1000,
            lord_name: 'Lord Test',
            lord_seasons: ['Season 1', 'Season 2'],
        });

        expect(response.status).toBe(201);
    });

    it('should not be able to create a new house with same name', async () => {
        const response = await request(app).post('/houses').send({
            name: 'House Test',
            region: 'Region Test',
            founded_in: 1000,
            lord_name: 'Lord Test',
            lord_seasons: ['Season 1', 'Season 2'],
        });

        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        if (connection) {
            await connection.query(`DELETE FROM houses WHERE name = 'House Test'`);
            await connection.query(`DELETE FROM lords WHERE name = 'Lord Test'`);
            await connection.close();
        }
    });
});