export type IServiceResponse<T>={
    response: T;
    dataBase: string;
    dataBaseIndex: number;
}

export type IGroupedService<S,E>={
    promises: Array<Promise<S|E>>;
    successes: Array<IServiceResponse<S>>;
    errores: Array<IServiceResponse<E>>;
}

export class GroupedService<S,E>{
    public promises: Array<Promise<S|E>>;
    public successes: Array<IServiceResponse<S>>;
    public errores: Array<IServiceResponse<E>>;
    constructor(promises: Array<Promise<S|E>>,succeses: Array<IServiceResponse<S>>, errores: Array<IServiceResponse<E>>){
        this.promises=promises;
        this.successes=succeses;
        this.errores=errores;
    }   
}


export class ServiceResponse<T>{
    public response: T;
    public dataBase: string;
    public dataBaseIndex: number;

    constructor(response: T,dataBase: string,dataBaseIndex: number){
        this.response=response;
        this.dataBase=dataBase;
        this.dataBaseIndex=dataBaseIndex;
    }    

}

