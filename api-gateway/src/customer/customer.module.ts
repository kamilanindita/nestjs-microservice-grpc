import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'CUSTOMER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('CUSTOMER_URL'),
            package: 'customer',
            protoPath: join(process.cwd(), 'src/proto/customer.proto')
          },
        }),
    },
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
