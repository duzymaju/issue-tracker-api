export class HttpResponseException extends Error {
    public statusCode: number;

    constructor(statusCode: number, message?: string) {
        super(message);
        this.statusCode = statusCode;
    }
}
