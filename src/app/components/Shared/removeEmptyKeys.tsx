export const removeEmptyKeys = (obj) => {
    for (let key in obj) {
        if (obj[key] === "" || obj[key] === null || obj[key] === undefined || obj[key] == 'null') {
            delete obj[key];
        }
    }
    return obj;
}