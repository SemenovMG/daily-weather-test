export interface IDateValidator {
    validate(date: string) : boolean;
    getErrorMessage(): string;
}