import JWT from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
import ForbuddenError from '../models/error/forbidden.error.model'
import userRepository from '../repositories/user.repository'
async function bearerAutenticationMiddwerrerlawar (req:Request,res:Response,next: NextFunction){
   try {
        const autorizationHeader =  req.headers['authorization']
        if (!autorizationHeader) {
            throw new  ForbuddenError("crecenciais não informadas")
        }

        const[autorizationtype,token] = autorizationHeader.split(':')
        if (autorizationtype !== "Bearer" || !token) {
            throw new  ForbuddenError("tipo de autenticação invalida")
        }

        const payloadToken = JWT.verify(token,'my_secret_token')
        if (typeof payloadToken !== 'object' || !payloadToken.sub) {
            throw new  ForbuddenError("Toke  invalido")
        }

       const user = {
           uuid: payloadToken.sub,
           username:payloadToken.username
       }
       req.user = user
        next();
   } catch (error) {
       next(error)
   }
}

export default bearerAutenticationMiddwerrerlawar