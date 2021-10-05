export enum ConnectionType {
    Mongoose = 'Mongoose',
    MySQL2 = 'MySQL2'
};

export enum ConnectionStatus {
    Up = 'Up',
    Down = 'Down',
    Error = 'Error',
};

export interface IConnection<I,O,C>{
    name:string;
    type:ConnectionType
    input: I;
    options: O; 
    status: ConnectionStatus;
    connection: C;
};

