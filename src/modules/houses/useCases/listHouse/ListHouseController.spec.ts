import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../../app';

let connection: Connection;
describe('List House Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    it('should be able to list a house', async () => {
        await request(app).post('/houses').send({
            name: 'House List Test',
            region: 'Region Test',
            founded_in: 1000,
            lord_name: 'Lord List Test',
            lord_seasons: ['Season 1', 'Season 2'],
        });

        const responseHouses = await request(app).get('/houses');
        expect(responseHouses.status).toBe(200);

        const responseHouseByName = await request(app).get('/houses?name=House List Test');
        expect(responseHouseByName.status).toBe(200);

        const houseId = JSON.parse(responseHouseByName.text)?.id;
        const responseHousesById = await request(app).get(`/houses?id=${houseId}`);
        expect(responseHousesById.status).toBe(200);
    });

    afterAll(async () => {
        if (connection) {
            await connection.query(`DELETE FROM houses WHERE name = 'House List Test'`);
            await connection.query(`DELETE FROM lords WHERE name = 'Lord List Test'`);
            await connection.close();
        }
    });
});