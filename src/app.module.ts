import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CustomConfigModule } from './modules/custom-config/custom-config.module';
import { CustomConfigService } from './modules/custom-config/custom-config.service';



@Module({
  imports: [
    CustomConfigModule,
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
      useFactory: async (customConfigService: CustomConfigService) => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: customConfigService.getDatabasePassword(),
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UsersModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
