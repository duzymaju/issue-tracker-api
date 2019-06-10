import { Connection } from 'typeorm';

export const DatabaseConnectionType = Symbol('DatabaseConnection');

export interface DatabaseConnectionInterface {
    get(): Promise<Connection>;
}
