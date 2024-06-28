// Default return types for services

export interface ISuccessResult {
    success: true,
}

export interface IErrorResult {
    success: false,
    message: string,
}
