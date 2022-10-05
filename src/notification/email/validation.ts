import { ICreatedOrderRequest } from "./created_order";
import { IRejectedOrderRequest } from "./rejected_order";


interface ValidationError {
    code?: string;
    messages: ValidationErrorItem[];
}
interface ValidationErrorItem {
    field: string;
    message: string;
}


export function validateSendCreatedOrder(body: ICreatedOrderRequest): Promise<ICreatedOrderRequest> {
    const result: ValidationError  = {
        messages: []
    };

    if (!body.name) {
        result.messages.push({ field: 'name', message: 'Name is required' });
    }
    if (!body.order_number) {
        result.messages.push({ field: 'order_number', message: 'Order number is required' });
    }
    if (!body.from) {
        result.messages.push({ field: 'from', message: 'From is required' });   
    }
    if (!body.to) {
        result.messages.push({ field: 'to', message: 'To is required' });
    }
    if (result.messages.length > 0) {
        return Promise.reject(result);
    }

    return Promise.resolve(body);

}

export function validateSendRejectedOrder(body: IRejectedOrderRequest): Promise<IRejectedOrderRequest> {
    const result: ValidationError  = {
        messages: []
    };

    if (!body.name) {
        result.messages.push({ field: 'name', message: 'Name is required' });
    }
    if (!body.reason) {
        result.messages.push({ field: 'reason', message: 'Reason number is required' });
    }
    if (!body.from) {
        result.messages.push({ field: 'from', message: 'From is required' });   
    }
    if (!body.to) {
        result.messages.push({ field: 'to', message: 'To is required' });
    }
    if (result.messages.length > 0) {
        return Promise.reject(result);
    }

    return Promise.resolve(body);

}