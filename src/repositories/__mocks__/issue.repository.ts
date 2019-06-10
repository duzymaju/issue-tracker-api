import { IssueRepositoryInterface } from '../interfaces/issue.repository.interface';

const issueRepository: IssueRepositoryInterface = {
    create: jest.fn(),
    getList: jest.fn(),
    getOne: jest.fn(),
    update: jest.fn(),
};

module.exports = issueRepository;
