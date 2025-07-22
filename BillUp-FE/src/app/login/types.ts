export type LoginFormInputs = {
    email: string;
    password: string;
};

export type LoginSuccessResponseType = {
    access_token: string;
};

export type ParsedJWTType =
    | {
    userId: number;
    roles: string[];
    exp?: number;
}
    | undefined;
