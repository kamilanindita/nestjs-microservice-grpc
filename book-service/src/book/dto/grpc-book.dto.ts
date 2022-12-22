export class BookResponses {
    data: BookResponse[];
}

export class BookDTO {
    id: number;
    title: string;
    description: string;
    author: string;
}

export class BookResponse {
    id: number;
    title: string;
    description: string;
    author: string;
}