export interface User {
    id: number;
    username: string;
    type: 'BASIC' | 'GPT';
}

export interface Token {
    access_token: string;
    token_type: string;
}

export interface AuthData {
    user: User;
    token: Token;
}
