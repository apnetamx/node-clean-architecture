export interface ITokenGenerator {
    generateToken(userId: string): string|null;
    revokeToken(userId: string): boolean;
    getTokenStatus(token: string): boolean;
}