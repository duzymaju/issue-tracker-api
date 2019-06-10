import { Response } from 'express';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { inject, LazyServiceIdentifer } from 'inversify';
import {
    controller, httpGet, httpMethod, httpPatch, httpPost, interfaces, requestBody, requestParam, response,
} from 'inversify-express-utils';
import { env } from 'process';
import { IssueEntity } from '../entities/issue.entity';
import { HttpResponseException } from '../exceptions/http-response.exception';
import { IssueRepositoryInterface, IssueRepositoryType } from '../repositories/interfaces/issue.repository.interface';
import { State } from '../types/state.type';

@controller('/api/v1/issues')
export class IssuesController implements interfaces.Controller {
    private readonly repository: IssueRepositoryInterface;
    private readonly origin: string;

    public constructor(
        @inject(new LazyServiceIdentifer(() => IssueRepositoryType)) repository: IssueRepositoryInterface,
    ) {
        this.repository = repository;
        this.origin = env.CLIENT_ORIGIN || '*';
    }

    @httpMethod('options', '/')
    public issuesOptions(
        @response() response: Response,
    ): string {
        const allowedMethods = 'GET,POST';
        response.setHeader('Access-Control-Allow-Origin', this.origin);
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        response.setHeader('Access-Control-Allow-Methods', allowedMethods);
        response.setHeader('Content-Length', allowedMethods.length);
        return allowedMethods;
    }

    @httpGet('/')
    public list(
        @response() response: Response,
    ): Promise<IssueEntity[]> {
        response.setHeader('Access-Control-Allow-Origin', this.origin);
        return this.repository.getList();
    }

    @httpPost('/')
    public create(
        @requestBody() { title, description }: { title: string, description: string },
        @response() response: Response,
    ): Promise<IssueEntity> {
        response.setHeader('Access-Control-Allow-Origin', this.origin);
        // @TODO: Add validation (e.g. joi) based on decorators if necessary
        if (typeof title !== 'string' || title.length === 0) {
            throw new HttpResponseException(BAD_REQUEST, 'Title invalid.');
        }
        if (typeof description !== 'string' || description.length === 0) {
            throw new HttpResponseException(BAD_REQUEST, 'Description invalid.');
        }
        return this.repository.create(title, description);
    }

    @httpMethod('options', '/:id')
    public issueOptions(
        @response() response: Response,
    ): string {
        const allowedMethods = 'PATCH';
        response.setHeader('Access-Control-Allow-Origin', this.origin);
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        response.setHeader('Access-Control-Allow-Methods', allowedMethods);
        response.setHeader('Content-Length', allowedMethods.length);
        return allowedMethods;
    }

    @httpPatch('/:id')
    public async update(
        @requestParam('id') id: number,
        @requestBody() { state }: { state: State },
        @response() response: Response,
    ): Promise<IssueEntity> {
        response.setHeader('Access-Control-Allow-Origin', this.origin);
        const issue = await this.repository.getOne(id);
        if (issue === null) {
            throw new HttpResponseException(NOT_FOUND, 'IssueEntity not found.');
        }
        // @TODO: Add validation (e.g. joi) based on decorators if necessary
        if (
            (issue.state !== State.OPEN || (state !== State.PENDING && state !== State.CLOSED)) &&
            (issue.state !== State.PENDING || state !== State.CLOSED)
        ) {
            throw new HttpResponseException(BAD_REQUEST, 'State invalid.');
        }
        issue.state = state;
        return this.repository.update(issue);
    }
}
