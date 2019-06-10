import { IssueEntity } from '../../entities/issue.entity';

export const IssueRepositoryType = Symbol('IssueRepository');

export interface IssueRepositoryInterface {
    getList(): Promise<IssueEntity[]>;
    getOne(id: number): Promise<IssueEntity|null>;
    create(title: string, description: string): Promise<IssueEntity>;
    update(issue: IssueEntity): Promise<IssueEntity>;
}
