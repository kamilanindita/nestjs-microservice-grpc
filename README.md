# nestjs-microservice-grpc
[Nestjs microservice](https://docs.nestjs.com/microservices/grpc) use the gRPC transport layer.

Architecture with gRPC transport in this project

![Architecture Microservices in Nestjs](./architecture.png?raw=true)

## Requirements
1. Docker
2. DockerDocker-Compose

## Dependencies
- node:16-alpine3.16 (Image)
- nestjs
- @nestjs/microservices
- @grpc/grpc-js
- @grpc/proto-loader

## Features/Modules/Services
- Api gateway
- Customer service
- Book service

## Setup config `.env`
Copy file `.env.prod.example` to `.env.prod`, and<br>
In the Customer and Book service, copy file `.env.example` to `.env`

## Running the Service
```bash
$ docker-compose up -d
```
## Stop the Service
```bash
$ docker-compose down
```

## The endpoint services
    Customer service: http://localhost:3000/customer <br>
    1. GET: http://localhost:3000/customer
    2. GET: http://localhost:3000/customer/{id}
    3. POST: http://localhost:3000/customer
    4. PUT: http://localhost:3000/customer/{id}
    5. DELETE: http://localhost:3000/customer/{id}
    
    Book service: http://localhost:3000/book <br>
    1. GET: http://localhost:3000/book
    2. GET: http://localhost:3000/book/{id}
    3. POST: http://localhost:3000/book
    4. PUT: http://localhost:3000/book/{id}
    5. DELETE: http://localhost:3000/book/{id}


