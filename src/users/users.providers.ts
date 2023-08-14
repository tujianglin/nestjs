import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './constants';
import { dataSource } from 'src/database/constants';

export const UserProviders = [
  {
    provide: UsersRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [dataSource],
  },
];
