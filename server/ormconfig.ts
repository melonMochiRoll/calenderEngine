import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { Todos } from 'src/entities/Todos';
import { Users } from 'src/entities/Users';

const ormconfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  entities: [
    Users,
    Todos,
  ],
  synchronize: true,
  autoLoadEntities: true,
  charset: 'utf8mb4',
}

export default ormconfig;