import { injectable } from 'inversify';
import { Connection, createConnection, ObjectType, Repository } from 'typeorm';
import { DatabaseConnectionInterface } from './interfaces/database.connection.interface';

@injectable()
export class DatabaseConnection implements DatabaseConnectionInterface {
    private connection?: Connection;

    public async getManager<Entity>(target: ObjectType<Entity>): Promise<Repository<Entity>> {
        if (!this.connection) {
            this.connection = await createConnection();
        }
        return this.connection.getRepository(target);
    }
}
