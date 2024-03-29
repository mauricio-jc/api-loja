import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './config/typeorm.config.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CryptographyModule } from './cryptography/cryptography.module';
import { MailModule } from './mail/mail.module';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsModule } from './notifications/notifications.module';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      inject: [TypeormConfigService],
    }),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
    ClientsModule,
    CryptographyModule,
    MailModule,
    NotificationsModule,
    FormsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    NotificationsGateway,
  ],
})
export class AppModule {}
