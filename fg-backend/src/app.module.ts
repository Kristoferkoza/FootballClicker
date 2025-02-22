import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CardsModule } from './cards/cards.module';
import { UserCardsModule } from './usercard/user-cards.module';
import { PacksModule } from './packs/packs.module';
import { KitElementsModule } from './kitelements/kitelements.module';
import { UserKitElementModule } from './userkitelement/user-kitelement.module';
import { UserKitElementConfigModule } from './UserKitElementConfig/UserKitElementConfig.module';
import { BoxesModule } from './boxes/boxes.module';
import { MicropaymentsModule } from './micropayments/micropayments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT, 10),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CardsModule,
    UserCardsModule,
    PacksModule,
    KitElementsModule,
    UserKitElementModule,
    UserKitElementConfigModule,
    BoxesModule,
    MicropaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
