import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'BOOK_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('BOOK_URL'),
            package: 'book',
            protoPath: join(process.cwd(), 'src/proto/book.proto')
          },
        }),
    },
  ],
  controllers: [BookController]
})
export class BookModule {}
