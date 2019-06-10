import { Container } from 'inversify';
export const container = new Container();

import 'reflect-metadata';
import './connections';
import './controllers';
import './repositories';
