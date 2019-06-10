import { config } from 'dotenv';
config();

import { container } from './loader';

import * as bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import { InversifyExpressServer } from 'inversify-express-utils';
import { env } from 'process';
import { HttpResponseException } from './exceptions/http-response.exception';

const server = new InversifyExpressServer(container);
server.setConfig(app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
});
server.setErrorConfig(app => {
    // catch 404 and forward to error handler
    app.use((request: Request, response: Response, next: NextFunction) => {
        next(new HttpResponseException(NOT_FOUND));
    });
    // error handler
    app.use((error: any, request: Request, response: Response, next: NextFunction) => {
        response.status(error.statusCode || INTERNAL_SERVER_ERROR);
        if (env.NODE_ENV === 'development') {
            response.json({ error: error.message || '', stack: error.stack || '' });
        } else {
            response.json({ error: error.message || '' });
        }
    });
});

const app = server.build();
const port = parseInt(env.PORT, 10) || 80;
app.set('port', port);
app.listen(port, () => {
    console.log('server', `Listening on ${port}`);
});
