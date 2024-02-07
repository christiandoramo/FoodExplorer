class AppError {
    message
    status
    constructor(message: string, status: number) {
        this.message = message
        this.status = status
    }
}
export default AppError;