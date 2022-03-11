import {Router,Request,Response,NextFunction} from 'express'
import {StatusCodes}  from 'http-status-codes'
import userRepository from '../repositories/user.repository'
const userRouters = Router()


userRouters.get("/users",async(req:Request,res:Response,next:NextFunction)=>{
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).json(users)

})

userRouters.get("/users/:id",async(req:Request<{id:string}>,res:Response,next:NextFunction)=>{
   try {
       const users = await userRepository.findById(req.params.id)
       res.status(StatusCodes.OK).send(users)
       
   } catch (error) {
    next(error)       
   }

})
userRouters.get("/users/:id",(req:Request,res:Response,next:NextFunction)=>{
    
    res.status(StatusCodes.OK).send(req.query)

})
userRouters.post("/users",async (req:Request,res:Response,next:NextFunction)=>{
    const newuser = req.body
    const users = await userRepository.create(newuser)
    res.status(StatusCodes.CREATED).send(users)

})  
userRouters.put("/users/:id", async (req:Request<{id:string}>,res:Response,next:NextFunction)=>{
    const user = req.body
    res.status(StatusCodes.OK).send(user)

})

userRouters.delete("/users/:id",async (req:Request<{id:string}>,res:Response,next:NextFunction)=>{
    const user = req.body
    const users = await userRepository.remove(user)
    res.status(StatusCodes.OK).send()

})

export default userRouters