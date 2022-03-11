import  {Router,Request,Response,NextFunction} from 'express'
import ForbuddenError from '../models/error/forbidden.error.model'
import userRepository from '../repositories/user.repository'
import JWT from 'jsonwebtoken'
import basicAutenticationMiddware from '../middlewares/basic.autentication.middware'
const autorizationRoute = Router()

autorizationRoute.post('/token',basicAutenticationMiddware , async(req:Request,res:Response,next:NextFunction)=>{
   try {
      
       const jwtPayload = {username:req.user.username}
       const jwtSubject = {subject:req.user?.uuid}
       const secretKey  = 'my_secret_key'
        JWT.sign(jwtPayload,secretKey,jwtSubject)

   } catch (error) {
       next(error)
   }
 
   
})
export default autorizationRoute