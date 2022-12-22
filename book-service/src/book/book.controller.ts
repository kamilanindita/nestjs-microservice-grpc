import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { BookDTO, BookResponse, BookResponses } from './dto/grpc-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService
    ){}

    @GrpcMethod('BookService', 'FindAll')
    getBooks(): Promise<BookResponses> {
        return this.bookService.findAll();
    }

    @GrpcMethod('BookService', 'FindOneById')
    getBookById(@Body('id') id: number): Promise<BookResponse|string> {
        return this.bookService.findOne(id);
    }

    @GrpcMethod('BookService','Create')
    createBook(createBookDTO: CreateBookDTO): Promise<BookResponse> {
        return this.bookService.create(createBookDTO);
    }

    @GrpcMethod('BookService', 'UpdateOneById')
    updateBook(bookDTO: BookDTO): Promise<BookResponse|string> {

        const updateDTO: UpdateBookDTO = {
            title: bookDTO.title,
            description: bookDTO.description,
            author: bookDTO.author
        }
        
        return this.bookService.update(bookDTO.id, updateDTO);
    }

    @GrpcMethod('BookService', 'DeleteOneById')
    deleteBookById(@Body('id') id: number): Promise<BookResponse|string> {
        return this.bookService.delete(id);
    }
}
