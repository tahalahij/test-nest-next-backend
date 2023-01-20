import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionService } from './transaction/transaction.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { GameModule } from './game/game.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    GameModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'firstDB',
      useFactory: async (config: ConfigService) => ({
        uri: config.get('app.firstDB'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, TransactionService],
})
export class AppModule {}
