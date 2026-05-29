

export interface Istudent{
     stdId: number;
    fname: string;
    lname: string;
    email: string;
    isActive: boolean;
}


export interface Ires<T>{
    msg : string,
    data : Istudent
}