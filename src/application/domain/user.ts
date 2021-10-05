export interface UserInputModel {
    //Required For Creation
    username?: string,  
    password?: string,
    phoneNumber?:string,  
    //roles:IRoleDocument['_id'][],
    
    //Optional
    id?: string,


    //Optional
    firstName?:string,  
    lastName?:string,  
    email?:string,
    zipPostalCode?:string,
    address1?:string,
    company?:string,
    country?:string,
    stateProvince?:string,
    city?:string,
    address2?:string,
}