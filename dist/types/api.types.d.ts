declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email?: string;
            };
        }
    }
}
export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}
export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
    };
}
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
//# sourceMappingURL=api.types.d.ts.map