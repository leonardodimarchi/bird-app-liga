/* #region  Imports */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/categories/category.module';
import { CommentModule } from './modules/comments/comment.module';
import { TypeOrmService } from './modules/typeorm/type-orm.service';
/* #endregion */

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService
    }),
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
    CommentModule,
  ],
})
export class AppModule { }
