export function isValidEmail(email: string) {

    if (!email)
        return null

    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    let isValid = true;

    if (!email || email === undefined || !reg.test(email))
        isValid = false;

    return isValid;

}

export function isNulliFyField(value: any) {
    let result = false;

    if (!value || value === "" || value === undefined || value === "null")
        result = true;

    return result;
}

export function compareFields(field1: string, field2: string) {
    let isEqual = false;

    if (field1 === field2)
        isEqual = true;


    return isEqual;
}