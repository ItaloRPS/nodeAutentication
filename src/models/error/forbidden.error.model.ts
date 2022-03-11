export default class ForbuddenError extends Error{
    constructor(
       
        public menssage:string,
        public error?:Error,
     ){
         super(menssage)
     }
}