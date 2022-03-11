class DatabaseError extends Error{
    constructor(
       
       public menssage:string,
       public error?:Error,
    ){
        super(menssage)
    }
        
}

export default DatabaseError