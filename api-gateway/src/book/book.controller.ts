import { Controller, Inject, Get, Param, Post, Body, Put, Delete, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import BookService from './book.service.interface';
import { BookDTO, BookResponse, BookResponses } from './dto/grpc-book.dto';

@Controller('book')
export class BookController implements OnModuleInit {
    private bookService: BookService;
 
    constructor(
        @Inject('BOOK_SERVICE') private client: ClientGrpc
    ) {}
 
    onModuleInit() {
        this.bookService = this.client.getService<BookService>('BookService');
    }

    @Get()
    getBooks(): BookResponses {
        return this.bookService.FindAll({})
    }

    @Get(':id')
    getBookById(@Param('id') id: number): BookResponse {
        return this.bookService.FindOneById({id})
    }

    @Post()
    createBook(@Body() createBookDTO: CreateBookDTO): BookResponse {
        return this.bookService.Create(createBookDTO)
    }

    @Put(':id')
    updateBook(@Param('id') id: number, @Body() updateBookDTO: UpdateBookDTO): BookResponse {
        const bookDTO: BookDTO = {
            id,
            ...updateBookDTO
        }
        return this.bookService.UpdateOneById(bookDTO)
    }

    @Delete(':id')
    deleteBookById(@Param('id') id: number): BookResponse {
        return this.bookService.DeleteOneById({id})
    }

}
