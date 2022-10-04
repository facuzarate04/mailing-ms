/* Validate */

export function requiredField (field: any) {
    if (!field) {
        return {path: field, message: `${field} can not be empty`};
    }
    return;
}

export function stringField (field: any) {
    if (typeof field !== 'string') {
        return {path: field, message: `${field} should be an string`};
    }
    return;
}