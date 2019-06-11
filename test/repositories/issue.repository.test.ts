import { DatabaseConnection } from '../../src/connections/database.connection';
import { IssueEntity } from '../../src/entities/issue.entity';
import { IssueRepository } from '../../src/repositories/issue.repository';
import { State } from '../../src/types/state.type';

describe(`IssueRepository test`, () => {
    const connectionMock: jest.Mocked<DatabaseConnection> =
        jest.requireMock('../../src/connections/database.connection');
    const managerMock = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
    };
    const repository = new IssueRepository(connectionMock);

    beforeEach(() => {
        jest.resetAllMocks();
        connectionMock.getManager.mockResolvedValue(managerMock as any);
    });

    describe(`getList test`, () => {
        it(`returns issues list`, async () => {
            const list = [getIssueEntity()];
            managerMock.find.mockResolvedValue(list);
            const result = await repository.getList();
            expect(result).toEqual(list);
        });
    });

    describe(`getOne test`, () => {
        it(`returns null if issue doesn't exist`, async () => {
            const issue = null;
            managerMock.findOne.mockResolvedValue(issue);
            const result = await repository.getOne(1);
            expect(result).toEqual(issue);
        });

        it(`returns issue`, async () => {
            const issue = getIssueEntity();
            managerMock.findOne.mockResolvedValue(issue);
            const result = await repository.getOne(2);
            expect(result).toEqual(issue);
        });
    });

    describe(`create test`, () => {
        it(`creates and returns new issue`, async () => {
            const title = 'test title';
            const description = 'test description';
            const state = State.OPEN;
            managerMock.save.mockImplementationOnce(entity => entity);
            const result = await repository.create(title, description);
            expect(result.title).toEqual(title);
            expect(result.description).toEqual(description);
            expect(result.state).toEqual(state);
        });
    });

    describe(`update test`, () => {
        it(`update and returns issue`, async () => {
            const issue = getIssueEntity();
            managerMock.save.mockResolvedValue(issue);
            const result = await repository.update(issue);
            expect(result).toEqual(issue);
        });
    });
});

const getIssueEntity = (partial: Partial<IssueEntity> = {}): IssueEntity => ({
    id: 1,
    title: 'issue title',
    description: 'issue description',
    state: State.OPEN,
    ...partial,
});
