import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { CustomerDTO, CustomerResponse, CustomerResponses } from "./dto/grpc-customer.dto";

interface CustomerService {
  Create(createCustomer: CreateCustomerDTO):  CustomerResponse
  FindAll(params: {}):  CustomerResponses
  FindOneById(params: {}): CustomerResponse
  UpdateOneById(updateCustomer: CustomerDTO):  CustomerResponse
  DeleteOneById(params: {}): CustomerResponse
}
 
export default CustomerService;