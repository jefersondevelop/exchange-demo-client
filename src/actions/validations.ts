import { Profile, User } from "models";
import { LoginUser } from "models/login";
import { RegisterUser } from "models/register";
import { isNulliFyField, isValidEmail } from "../tools/validations";
import moment from 'moment'

export function diffWithCurrentDate(date: any) {
    const expiration = moment(date).format('YYYY/MM/DD');
    const today = moment(new Date()).format('YYYY/MM/DD');
    const day = moment(expiration).diff(moment(today), 'days');
    return day;
}

export function areRecoverPassValid(email: string) {

    if (!email) {
        return false;
    }

    if (isNulliFyField(email)) {
        return false
    }

    if (!isValidEmail(email)) {
        return false;
    }

    return true
}

export function areLoginParamsValid(params: LoginUser) {

    if (!params) {
        return false;
    }

    if (isNulliFyField(params.email) || isNulliFyField(params.password)) {
        return false
    }

    if (!isValidEmail(params.email)) {
        return false;
    }

    return true;

}

export function areValidatePassChangeValid(password: string, confirmPassword: string, token: string | null) {
    console.log(password, token, confirmPassword)
    if (
        isNulliFyField(password) ||
        isNulliFyField(confirmPassword) ||
        isNulliFyField(token)
    ) {
        return false
    }

    if (password !== confirmPassword) {
        return false
    }

    return true;
}

export function areRegisterParamsValid(params: RegisterUser) {
    if (!params) {
        return false;
    }

    if (
        isNulliFyField(params.email) ||
        isNulliFyField(params.password) ||
        isNulliFyField(params.confirmPassword) ||
        !params.profile ||
        isNulliFyField(params.profile.username) ||
        isNulliFyField(params.profile.currentCountry)
    ) {
        return false
    }

    if (!isValidEmail(params.email)) {
        return false;
    }

    if (params.password !== params.confirmPassword) {
        return false
    }

    return true;
}

export function areUpdateProfileValid(params: Profile | undefined) {

    if (!params) {
        return false
    }

    if (
        isNulliFyField(params.username) ||
        isNulliFyField(params.lastname) ||
        isNulliFyField(params.occupation) ||
        params.occupation === '-1' ||
        isNulliFyField(params.phoneNumber) ||
        isNulliFyField(params.birthdate) ||
        diffWithCurrentDate(params.birthdate) >= 0 ||
        isNulliFyField(params.birthCountry) ||
        isNulliFyField(params.documentDate) ||
        diffWithCurrentDate(params.documentDate) >= 0 ||
        isNulliFyField(params.documentType) ||
        params.documentType === "-1" ||
        isNulliFyField(params.documentNumber) ||
        isNulliFyField(params.address) ||
        isNulliFyField(params.city) ||
        isNulliFyField(params.currentCountry) ||
        params.currentCountry === "-1" ||
        isNulliFyField(params.dniFront) ||
        isNulliFyField(params.dniBack)
    ) {
        return false
    }

    return true;

}

export function areChanginPassValid(user: User) {


    if (
        isNulliFyField(user) ||
        isNulliFyField(user.password) ||
        isNulliFyField(user.newPassword) ||
        isNulliFyField(user.confirmPassword) ||
        user.newPassword !== user.confirmPassword
    ) {
        return false
    }

    return true;

}

export function imageHasFormatValid(image: any) {
    let allowed_extensions = ['jpg', 'jpeg', 'png'];
    let short_name = image.name.split('.')
    let extension = short_name[short_name.length - 1]

    if (allowed_extensions.indexOf(extension) < 0) {
        return false;
    }

    return true;
}

export function areExchangeFormValid(exchange: any) {

    if (
        isNulliFyField(exchange) ||
        isNulliFyField(exchange.sourceName) ||
        isNulliFyField(exchange.targetName) ||
        isNulliFyField(exchange.type) ||
        isNulliFyField(exchange.finalValue) ||
        isNulliFyField(exchange.comission) ||
        exchange.comission < 0 ||
        exchange.finalValue < 0
    ) {
        return false
    }

    return true;

}

export function areTransactionValid(transaction: any) {
    console.log(transaction)
    if (
        isNulliFyField(transaction) ||
        isNulliFyField(transaction.targetCountry) ||
        isNulliFyField(transaction.comission) ||
        isNulliFyField(transaction.source) ||
        isNulliFyField(transaction.target) ||
        isNulliFyField(transaction.reciptAccount) ||
        isNulliFyField(transaction.reciptEmail) ||
        isNulliFyField(transaction.reciptName) ||
        isNulliFyField(transaction.reciptPhone)
    ) {
        return false
    }

    return true;
}