export interface JwtToken {
    token: string;
}

export interface JwtUserPayload {
    id: any;
    email: string;
}