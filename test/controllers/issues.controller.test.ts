import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { IssuesController } from '../../src/controllers/issues.controller';
import { IssueEntity } from '../../src/entities/issue.entity';
import { HttpResponseException } from '../../src/exceptions/http-response.exception';
import { IssueRepository } from '../../src/repositories/issue.repository';
import { State } from '../../src/types/state.type';

describe(`IssuesController test`, () => {
    const repositoryMock: jest.Mocked<IssueRepository> =
        jest.requireMock('../../src/repositories/issue.repository');
    const responseMock = {
        setHeader: jest.fn(),
    };
    const controller = new IssuesController(repositoryMock);

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe(`list test`, () => {
        it(`returns issues list`, async () => {
            const list = [getIssueEntity()];
            repositoryMock.getList.mockResolvedValue(list);
            const result = await controller.list(responseMock as any);
            expect(result).toEqual(list);
            expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            return expect(repositoryMock.getList).toHaveBeenCalledWith();
        });
    });

    describe(`create test`, () => {
        it(`throws exception in case of empty body`, async () => {
            try {
                await controller.create({} as any, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            }
        });

        it(`throws exception in case of no title string`, async () => {
            try {
                await controller.create({ description: 'test' } as any, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
            }
        });

        it(`throws exception in case of empty title string`, async () => {
            try {
                await controller.create({ title: '', description: 'test' } as any, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
            }
        });

        it(`throws exception in case of no description string`, async () => {
            try {
                await controller.create({ title: 'test' } as any, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
            }
        });

        it(`throws exception in case of empty description string`, async () => {
            try {
                await controller.create({ title: 'test', description: '' } as any, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
            }
        });

        it(`creates an issue`, async () => {
            const issue = getIssueEntity({ description: 'test description', title: 'test title' });
            repositoryMock.create.mockResolvedValue(issue);
            const result = await controller.create(
                { description: issue.description, title: issue.title } as any, responseMock as any,
            );
            expect(result).toEqual(issue);
            expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            return expect(repositoryMock.create).toHaveBeenCalledWith(issue.title, issue.description);
        });
    });

    describe(`update test`, () => {
        it(`throws exception in case of no issue`, async () => {
            try {
                repositoryMock.getOne.mockResolvedValue(null);
                await controller.update(1, { state: State.PENDING }, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(NOT_FOUND);
                expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            }
        });

        it(`throws exception in case of no state value`, async () => {
            try {
                const issue = getIssueEntity();
                repositoryMock.getOne.mockResolvedValue(issue);
                await controller.update(1, {} as any, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
                expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            }
        });

        it(`throws exception in case of wrong state value (PENDING -> OPEN)`, async () => {
            try {
                const issue = getIssueEntity({ state: State.PENDING });
                repositoryMock.getOne.mockResolvedValue(issue);
                await controller.update(1, { state: State.OPEN}, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
                expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            }
        });

        it(`throws exception in case of wrong state value (PENDING -> PENDING)`, async () => {
            try {
                const issue = getIssueEntity({ state: State.PENDING });
                repositoryMock.getOne.mockResolvedValue(issue);
                await controller.update(1, { state: State.PENDING}, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
                expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            }
        });

        it(`throws exception in case of wrong state value (CLOSED -> OPEN)`, async () => {
            try {
                const issue = getIssueEntity({ state: State.CLOSED });
                repositoryMock.getOne.mockResolvedValue(issue);
                await controller.update(1, { state: State.OPEN}, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
                expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            }
        });

        it(`throws exception in case of wrong state value (CLOSED -> PENDING)`, async () => {
            try {
                const issue = getIssueEntity({ state: State.CLOSED });
                repositoryMock.getOne.mockResolvedValue(issue);
                await controller.update(1, { state: State.PENDING}, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
                expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            }
        });

        it(`throws exception in case of wrong state value (CLOSED -> CLOSED)`, async () => {
            try {
                const issue = getIssueEntity({ state: State.CLOSED });
                repositoryMock.getOne.mockResolvedValue(issue);
                await controller.update(1, { state: State.CLOSED}, responseMock as any);
                throw Error('Unexpected success.');
            } catch (error) {
                expect(error).toBeInstanceOf(HttpResponseException);
                expect(error.statusCode).toEqual(BAD_REQUEST);
                expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            }
        });

        it(`modifies issue's state (OPEN -> PENDING)`, async () => {
            const issue = getIssueEntity({ state: State.OPEN });
            repositoryMock.getOne.mockResolvedValue(issue);
            repositoryMock.update.mockResolvedValue(issue);
            const result = await controller.update(1, { state: State.PENDING } as any, responseMock as any);
            expect(result).toEqual(issue);
            expect(result.state).toEqual(State.PENDING);
            expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            return expect(repositoryMock.update).toHaveBeenCalledWith(issue);
        });

        it(`modifies issue's state (OPEN -> CLOSED)`, async () => {
            const issue = getIssueEntity({ state: State.OPEN });
            repositoryMock.getOne.mockResolvedValue(issue);
            repositoryMock.update.mockResolvedValue(issue);
            const result = await controller.update(1, { state: State.CLOSED } as any, responseMock as any);
            expect(result).toEqual(issue);
            expect(result.state).toEqual(State.CLOSED);
            expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            return expect(repositoryMock.update).toHaveBeenCalledWith(issue);
        });

        it(`modifies issue's state (PENDING -> CLOSED)`, async () => {
            const issue = getIssueEntity({ state: State.PENDING });
            repositoryMock.getOne.mockResolvedValue(issue);
            repositoryMock.update.mockResolvedValue(issue);
            const result = await controller.update(1, { state: State.CLOSED } as any, responseMock as any);
            expect(result).toEqual(issue);
            expect(result.state).toEqual(State.CLOSED);
            expect(responseMock.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
            return expect(repositoryMock.update).toHaveBeenCalledWith(issue);
        });
    });

    describe(`options test`, () => {
        it(`returns issues options`, async () => {
            const allowedMethods = 'GET,POST';
            const result = await controller.issuesOptions(responseMock as any);
            expect(responseMock.setHeader).toHaveBeenNthCalledWith(1, 'Access-Control-Allow-Origin', '*');
            expect(responseMock.setHeader).toHaveBeenNthCalledWith(2, 'Access-Control-Allow-Headers', 'Content-Type');
            expect(responseMock.setHeader).toHaveBeenNthCalledWith(3, 'Allow', allowedMethods);
            expect(responseMock.setHeader).toHaveBeenNthCalledWith(4, 'Content-Length', allowedMethods.length);
            return expect(result).toEqual(allowedMethods);
        });

        it(`returns issue options`, async () => {
            const allowedMethods = 'PATCH';
            const result = await controller.issueOptions(responseMock as any);
            expect(responseMock.setHeader).toHaveBeenNthCalledWith(1, 'Access-Control-Allow-Origin', '*');
            expect(responseMock.setHeader).toHaveBeenNthCalledWith(2, 'Access-Control-Allow-Headers', 'Content-Type');
            expect(responseMock.setHeader).toHaveBeenNthCalledWith(3, 'Allow', allowedMethods);
            expect(responseMock.setHeader).toHaveBeenNthCalledWith(4, 'Content-Length', allowedMethods.length);
            return expect(result).toEqual(allowedMethods);
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
