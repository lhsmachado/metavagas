type ErrorResponseType = {
    error:boolean;
    message: string | string[];
    status: number;
}

function commonError(message: string, status: number):ErrorResponseType {
    return {
        error:true,
        message,
        status
    }
}

export { commonError, ErrorResponseType }