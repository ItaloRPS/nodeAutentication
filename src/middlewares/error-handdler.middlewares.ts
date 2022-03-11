import {Router,Request,Response,NextFunction} from 'express'
import {StatusCodes}  from 'http-status-codes'
import DatabaseError from '../models/error/database.error.model'
import ForbuddenError from '../models/error/forbidden.error.model'

function errorHandler(error:any,req:Request,res:Response,next: NextFunction){
    if (error instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST)
        
    } else if(error instanceof ForbuddenError){
        res.sendStatus(StatusCodes.FORBIDDEN)
    }else{
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
export default errorHandler