import { Inject, Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { ClientGrpc } from '@nestjs/microservices';
import CustomerService from './customer.service.interface';
import { CustomerDTO, CustomerResponse, CustomerResponses } from './dto/grpc-customer.dto';

@Controller('customer')
export class CustomerController {
    private customerService: CustomerService;
 
    constructor(
        @Inject('CUSTOMER_SERVICE') private client: ClientGrpc
    ) {}
 
    onModuleInit() {
        this.customerService = this.client.getService<CustomerService>('CustomerService');
    }

    @Get()
    getCustomers(): CustomerResponses {
        return this.customerService.FindAll({})
    }

    @Get(':id')
    getCustomerById(@Param('id') id: number): CustomerResponse {
        return this.customerService.FindOneById({id})
    }

    @Post()
    createCustomer(@Body() createCustomerDTO: CreateCustomerDTO): CustomerResponse {
        return this.customerService.Create(createCustomerDTO)
    }

    @Put(':id')
    updateCustomer(@Param('id') id: number, @Body() updateCustomerDTO: UpdateCustomerDTO): any {
        const customerDTO: CustomerDTO = {
            id,
            ...updateCustomerDTO
        }
        return this.customerService.UpdateOneById(customerDTO)
    }

    @Delete(':id')
    deleteCustomerById(@Param('id') id: number): CustomerResponse {
        return this.customerService.DeleteOneById({id})
    }
}
