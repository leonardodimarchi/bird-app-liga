//#region Imports
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
//#endregion

/**
 * A classe que representa o serviço que constroi as configurações do Typeorm
 */
@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {

    constructor(
        private readonly config: ConfigService,
    ){

    }

    //#region Public Methods

    /**
     * Método que obtém as configurações para o Typeorm
     */
    public createTypeOrmOptions(): TypeOrmModuleOptions {
    let options: TypeOrmModuleOptions = {
        database: this.config.get<string>('DB_DATABASE'),
        synchronize: this.config.get<boolean>('DB_SYNCHRONIZE'),
        migrationsRun: this.config.get<boolean>('DB_MIGRATIONS_RUN'),
        logging: this.config.get<boolean>('DB_LOGGING'),
        entities: [
        __dirname + '/../../../typeorm/entities/**/*{.entity.ts,.entity.js}',
        ],
        migrations: [
        __dirname + '/../../../typeorm/migrations/**/*{.ts,.js}',
        ],
    };

    if (this.config.get<string>('DB_TYPE') === 'mysql') {
        options = Object.assign(options, {
        type: 'mysql',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        url: this.config.get<string>('DATABASE_URL'),
        // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
        keepConnectionAlive: true,
        host: this.config.get<string>('DB_HOST'),
        port: this.config.get<string>('DB_PORT'),
        username: this.config.get<string>('DB_USER'),
        password: this.config.get<string>('DB_PASSWORD'),
        acquireTimeout: this.config.get<number>('DB_TIMEOUT'),
        });
    } else if (this.config.get<string>('DB_TYPE') === 'postgres') {
        options = Object.assign(options, {
        type: 'postgres',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
        keepConnectionAlive: true,
        url: this.config.get<string>('DATABASE_URL'),
        host: this.config.get<string>('DB_HOST'),
        port: this.config.get<string>('DB_PORT'),
        username: this.config.get<string>('DB_USER'),
        password: this.config.get<string>('DB_PASSWORD'),
        acquireTimeout: this.config.get<number>('DB_TIMEOUT'),
        extra: {
            ssl: this.config.get<boolean>('DB_SSL'),
        },
        });
    } else if (this.config.get<string>('DB_TYPE') === 'sqlite') {
        options = Object.assign(options, {
        type: 'sqlite',
        });
    } else {
        throw new InternalServerErrorException('Não há um outro tipo de banco de dados suportado, por favor, altere para MySQL o valor de DB_TYPE.');
    }

    return options;
    }

    //#endregion

}