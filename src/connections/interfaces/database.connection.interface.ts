import { ObjectType, Repository } from 'typeorm';

export const DatabaseConnectionType = Symbol('DatabaseConnection');

export interface DatabaseConnectionInterface {
    getManager<Entity>(target: ObjectType<Entity>): Promise<Repository<Entity>>;
}
