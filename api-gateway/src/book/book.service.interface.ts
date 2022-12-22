import { CreateBookDTO } from "./dto/create-book.dto";
import { BookDTO, BookResponse, BookResponses } from "./dto/grpc-book.dto";

interface BookService {
  Create(createBook: CreateBookDTO):  BookResponse
  FindAll(params: {}):  BookResponses
  FindOneById(params: {}): BookResponse
  UpdateOneById(updateBook: BookDTO):  BookResponse
  DeleteOneById(params: {}): BookResponse
}
 
export default BookService;