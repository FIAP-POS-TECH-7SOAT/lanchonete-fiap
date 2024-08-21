declare module Express{
    export interface Request{
        user:{
            id:string | null
            // name: string | null;
            // email: string | null;
            // cpf: string | null;
        }
    }
}