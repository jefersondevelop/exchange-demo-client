export interface RegisterUser {
    email: string,
    password: string,
    confirmPassword: string,
    profile: {
        username: string,
        currentCountry: string
    }
}