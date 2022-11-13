import { getOne } from "@/template/schema";
import { ISendEmailRequest } from "./emailController";



interface ValidationError {
    code?: string;
    messages: ValidationErrorItem[];
}
interface ValidationErrorItem {
    field: string;
    message: string;
}


export async function validateSendEmailRequest(body: ISendEmailRequest): Promise<ISendEmailRequest> {
    const result: ValidationError  = {
        messages: []
    };

    if (!body.moduleName) {
        result.messages.push({ field: 'moduleName', message: 'moduleNamefield is required' });
    }

    if (!body.templateName) {
        result.messages.push({ field: 'templateName', message: 'templateNamefield is required' });
    }

    if (!body.to) {
        result.messages.push({ field: 'to', message: 'to field is required' });
    }

    await validateHtmlData(body.moduleName, body.templateName, body.htmlData, result);

    if (result.messages.length > 0) {
        return Promise.reject(result);
    }

    return Promise.resolve(body);

}

async function validateHtmlData(moduleName:string, templateName: string, htmlData: object, result: ValidationError): Promise<object | ValidationError> {
    if(!htmlData) {
        result.messages.push({ field: 'htmlData', message: 'htmlData field is required' });
        return Promise.reject(result);
    }

    const template = await getOne(moduleName, templateName);

    if(template) {
        const regex = new RegExp(/{{\s*[\w.]+\s*}}/g);
        const matches = template.html.match(regex);
        if(matches) {
            matches.forEach(match => {
                if(!htmlData.hasOwnProperty(match.replace(/{{\s*|\s*}}/g, ''))) {
                    result.messages.push({ field: 'html', message: `html field is missing ${match}` });
                }
            });
        }
    }
    
    if(result.messages.length > 0) {
        return Promise.reject(result);
    }

    return Promise.resolve(htmlData);
}