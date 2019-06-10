import { inject, injectable, LazyServiceIdentifer } from 'inversify';
import { Repository } from 'typeorm';
import {
    DatabaseConnectionInterface, DatabaseConnectionType,
} from '../connections/interfaces/database.connection.interface';
import { IssueEntity } from '../entities/issue.entity';
import { State } from '../types/state.type';
import { IssueRepositoryInterface } from './interfaces/issue.repository.interface';

@injectable()
export class IssueRepository implements IssueRepositoryInterface {
    private readonly connection: DatabaseConnectionInterface;
    private manager?: Repository<IssueEntity>;

    public constructor(
        @inject(new LazyServiceIdentifer(() => DatabaseConnectionType)) connection: DatabaseConnectionInterface,
    ) {
        this.connection = connection;
    }

    public async getList(): Promise<IssueEntity[]> {
        const manager = await this.getManager();
        return manager.find();
    }

    public async getOne(id: number): Promise<IssueEntity|null> {
        const manager = await this.getManager();
        const issue = await manager.findOne(id);
        return issue || null;
    }

    public async create(title: string, description: string): Promise<IssueEntity> {
        const issue = new IssueEntity();
        issue.title = title;
        issue.description = description;
        issue.state = State.OPEN;
        const manager = await this.getManager();
        return manager.save(issue);
    }

    public async update(issue: IssueEntity): Promise<IssueEntity> {
        const manager = await this.getManager();
        return manager.save(issue);
    }

    private async getManager(): Promise<Repository<IssueEntity>> {
        if (!this.manager) {
            const connection = await this.connection.get();
            this.manager = connection.getRepository(IssueEntity);
        }
        return this.manager;
    }
}
