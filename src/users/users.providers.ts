import { USERS_REPOSITORY, DATABASE_CONNECTION } from './../constants';
import { Users } from './entities/user.entity';
import { Connection } from 'typeorm';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Users),
    inject: [DATABASE_CONNECTION],
  },
];
