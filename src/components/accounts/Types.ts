export type ErrorMessages = {
    [key: string]: string[] | undefined;
};

export type Error = {
    status: number | null;
    msg: ErrorMessages;
};
