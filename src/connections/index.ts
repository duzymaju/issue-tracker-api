import { container } from '../loader';
import { DatabaseConnection } from './database.connection';
import { DatabaseConnectionType } from './interfaces/database.connection.interface';

container.bind(DatabaseConnectionType).to(DatabaseConnection).inSingletonScope();
