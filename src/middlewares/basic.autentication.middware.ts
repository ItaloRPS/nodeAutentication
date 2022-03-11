import {Request,Response,NextFunction} from 'express'
import ForbuddenError from '../models/error/forbidden.error.model'
import userRepository from '../repositories/user.repository'
async function basicAutenticationMiddware  (req:Request,res:Response,next: NextFunction){
    const autorizationHeader =  req.headers['authorization']
    if (!autorizationHeader) {
        throw new  ForbuddenError("recenciais não informadas")
    }
    
   const [autenticatoinType , token] = autorizationHeader.split(' ')
    if (autenticatoinType !== "Basic" || !token) {
     throw new  ForbuddenError("recenciais incorretas")
    }
    const tokenContent = Buffer.from(token,'base64').toString('utf-8')
    const[username,passsword] = tokenContent.split(':')
    if (!username ||!passsword)  {
     throw new  ForbuddenError("recenciais não informadas")
    }
    const user = await userRepository.findByNameAndPassword(username,passsword)
    if (!user) {
     throw new  ForbuddenError("recenciais incorretas")
    }
    req.user = user
}

export default basicAutenticationMiddware;