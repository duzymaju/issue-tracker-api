import { DatabaseConnectionInterface } from '../interfaces/database.connection.interface';

const databaseConnection: DatabaseConnectionInterface = {
    getManager: jest.fn(),
};

module.exports = databaseConnection;
