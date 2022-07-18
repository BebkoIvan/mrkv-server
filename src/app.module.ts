import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './todo/entities/todo.entity';
import { TodoModule } from './todo/todo.module';
import { Contact } from './contacts/entities/contact.entity';
import { ContactModule } from './contacts/contact.module';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TodoModule,
    TypeOrmModule.forRoot(
      {
        url: process.env.DATABASE_URL,
        type: 'postgres',
        // host: 'postgres',
        ssl: {
          rejectUnauthorized: false,
        },
        // username: process.env.POSTGRES_USER,
        // password: process.env.POSTGRES_PASSWORD,
        // database: process.env.POSTGRES_DB,
        entities: [Todo, Contact, News],
        autoLoadEntities: true,
        synchronize: true,
      }
    ),
    ContactModule,
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
