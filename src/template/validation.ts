import { IStoreTemplateRequest } from "@/template/templateController";
import { getTemplate, IConnectionSMTP } from "@/template/schema";

interface ValidationError {
    code?: string;
    messages: ValidationErrorItem[];
}
interface ValidationErrorItem {
    field: string;
    message: string;
}

export async function validateStoreTemplateRequest(data: IStoreTemplateRequest) : Promise<IStoreTemplateRequest | ValidationError> {
    const result: ValidationError  = {
        messages: []
    };
    
    await validateNames(data.moduleName, data.templateName, result);
    await validateSubject(data.subject, result);
    await validateHtml(data.html, data.moduleName, data.templateName, result);
    await validateConnection(data.connection, result);

    if(result.messages.length) {
        return Promise.reject(result);
    }

    return Promise.resolve(data);

}

async function validateNames(moduleName: string, templateName: string, result: ValidationError): Promise<string | ValidationError> {
    
    if(!moduleName) {
        result.messages.push({ field: 'moduleName', message: 'moduleName field is required' });
        return Promise.reject(result);
    }

    if(!templateName) {
        result.messages.push({ field: 'templateName', message: 'templateName field is required' });
        return Promise.reject(result);
    }

    const template = await getTemplate(moduleName, templateName);

    if(template) {
        result.messages.push(
            { field: 'moduleName', message: 'moduleName already exists' },
            { field: 'templateName', message: 'templateName already exists' }
        );
        return Promise.reject(result);
    }

    if(moduleName.length < 3) {
        result.messages.push({ field: 'moduleName', message: 'moduleName field must be at least 3 characters long' });
        return Promise.reject(result);
    }

    if(moduleName.length > 15) {
        result.messages.push({ field: 'moduleName', message: 'moduleName field must be at most 15 characters long' });
        return Promise.reject(result);
    }

    if(templateName.length < 3) {
        result.messages.push({ field: 'templateName', message: 'templateName field must be at least 3 characters long' });
        return Promise.reject(result);
    }

    if(templateName.length > 15) {
        result.messages.push({ field: 'templateName', message: 'templateName field must be at most 15 characters long' });
        return Promise.reject(result);
    }
    
    return Promise.resolve(templateName);
}


async function validateSubject(subject: string, result: ValidationError): Promise<string | ValidationError> {
    if(!subject) {
        result.messages.push({ field: 'subject', message: 'subject field is required' });
        return Promise.reject(result);
    }

    if(subject.length < 3) {
        result.messages.push({ field: 'subject', message: 'subject field must be at least 3 characters long' });
        return Promise.reject(result);
    }

    if(subject.length > 50) {
        result.messages.push({ field: 'subject', message: 'subject field must be at most 50 characters long' });
        return Promise.reject(result);
    }

    return Promise.resolve(subject);

}


async function validateHtml(html: string, moduleName:string, templateName: string, result: ValidationError): Promise<string> {
    
    if(!html) {
        result.messages.push({ field: 'html', message: 'html field is required' });
        return Promise.reject(result);
    }
    const template = await getTemplate(moduleName, templateName);

    return Promise.resolve(html);

}


async function validateConnection(connection: IConnectionSMTP, result: ValidationError): Promise<IConnectionSMTP> {
    if(!connection) {
        result.messages.push({ field: 'connection', message: 'connection field is required' });
        return Promise.reject(result);
    }
    if(!connection.from) {
        result.messages.push({ field: 'connection.from', message: 'connection.from field is required' });
        return Promise.reject(result);
    }
    if(!connection.host) {
        result.messages.push({ field: 'connection.host', message: 'connection.host field is required' });
        return Promise.reject(result);
    }
    if(!connection.port) {
        result.messages.push({ field: 'connection.port', message: 'connection.port field is required' });
        return Promise.reject(result);
    }
    if(connection.auth && !connection.auth.user) {
        result.messages.push({ field: 'connection.auth.user', message: 'connection.auth.user field is required' });
        return Promise.reject(result);
    }
    if(connection.auth && !connection.auth.pass) {
        result.messages.push({ field: 'connection.auth.pass', message: 'connection.auth.pass field is required' });
        return Promise.reject(result);
    }

    return Promise.resolve(connection);

}
