import {Router,Request,Response,NextFunction} from 'express'
import {StatusCodes}  from 'http-status-codes'
const statusRouters = Router()

statusRouters.get("/status",(req:Request,res:Response,next:NextFunction)=>{

    res.status(StatusCodes.OK)

})

export default statusRouters