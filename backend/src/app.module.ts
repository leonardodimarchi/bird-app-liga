/* #region  Imports */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/categories/category.module';
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
  ],
})
export class AppModule { }
