export interface AccessData {
    accessToken: JwtToken;
    refreshToken: JwtToken;
}

export interface JwtToken {
    token: string;
    createdAt: Date;
    tokenType: 'Bearer';
    expireIn: Date;
}