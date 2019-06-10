import { injectable } from 'inversify';
import { Connection, createConnection } from 'typeorm';
import { DatabaseConnectionInterface } from './interfaces/database.connection.interface';

@injectable()
export class DatabaseConnection implements DatabaseConnectionInterface {
    private connection?: Connection;

    public async get(): Promise<Connection> {
        if (!this.connection) {
            this.connection = await createConnection();
        }
        return this.connection;
    }
}
