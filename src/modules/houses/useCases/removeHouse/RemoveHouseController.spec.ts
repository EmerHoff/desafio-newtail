import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../../app';

let connection: Connection;
describe('Remove House Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    it('should be able to remove a house', async () => {
        await request(app).post('/houses').send({
            name: 'House Remove Test',
            region: 'Region Test',
            founded_in: 1000,
            lord_name: 'Lord Remove Test',
            lord_seasons: ['Season 1', 'Season 2'],
        });

        const responseHouse = await request(app).get('/houses?name=House Remove Test');

        const houseId = JSON.parse(responseHouse.text)?.id;

        const response = await request(app).delete(`/houses/${houseId}`);

        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        if (connection) {
            await connection.query(`DELETE FROM houses WHERE name = 'House Remove Test'`);
            await connection.query(`DELETE FROM lords WHERE name = 'Lord Remove Test'`);
            await connection.close();
        }
    });
});