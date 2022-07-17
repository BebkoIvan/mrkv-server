import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './todo/entities/todo.entity';
import { TodoModule } from './todo/todo.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TodoModule,
    TypeOrmModule.forRoot(
      {
        url: process.env.DATABASE_URL,
        type: 'postgres',
        ssl: {
          rejectUnauthorized: false,
        },
        // username: process.env.POSTGRES_USER,
        // password: process.env.POSTGRES_PASSWORD,
        // database: process.env.POSTGRES_DB,
        entities: [Todo, User],
        autoLoadEntities: true,
        synchronize: true,
      }
    ),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
