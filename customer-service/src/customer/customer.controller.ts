import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerDTO, CustomerResponse, CustomerResponses } from './dto/grpc-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ){}

    @GrpcMethod('CustomerService', 'FindAll')
    getCustomers(): Promise<CustomerResponses> {
        return this.customerService.findAll();
    }

    @GrpcMethod('CustomerService', 'FindOneById')
    getCustomerById(@Body('id') id: number): Promise<CustomerResponse|string> {
        return this.customerService.findOne(id);
    }

    @GrpcMethod('CustomerService', 'Create')
    createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<CustomerResponse> {
        return this.customerService.create(createCustomerDTO);
    }

    @GrpcMethod('CustomerService', 'UpdateOneById')
    updateCustomer(customerDTO: CustomerDTO): Promise<CustomerResponse|string> {
        const updateDTO: UpdateCustomerDTO = {
            name: customerDTO.name,
            email: customerDTO.email,
            address: customerDTO.address
        }
        return this.customerService.update(customerDTO.id, updateDTO);
    }

    @GrpcMethod('CustomerService', 'DeleteOneById')
    deleteCustomerById(@Body('id') id: number): Promise<CustomerResponse|string> {
        return this.customerService.delete(id);
    }
}
