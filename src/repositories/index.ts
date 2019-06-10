import { container } from '../loader';
import { IssueRepositoryType } from './interfaces/issue.repository.interface';
import { IssueRepository } from './issue.repository';

container.bind(IssueRepositoryType).to(IssueRepository).inSingletonScope();
