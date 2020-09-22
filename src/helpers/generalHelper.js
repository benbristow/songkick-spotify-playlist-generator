export const isUndefinedOrNullOrEmpty = (obj) => {
    return obj === undefined || obj === null || (typeof obj === 'string' && !obj.trim().length);
}