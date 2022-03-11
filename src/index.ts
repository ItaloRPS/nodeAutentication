import express, {Request,Response,NextFunction}  from 'express'
import userRouters from './routes/users.routes'
import statusRouters from './routes/status.route'
import errorHandler from './middlewares/error-handdler.middlewares'
import autorizationRoute from './routes/autorization.router'
import bearerAutenticationMiddwerrerlawar from './middlewares/jwtAutenticationMiddwerrerlawar'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(userRouters)
app.use(statusRouters)


//HANDLES DE ERRO
app.use(errorHandler)
app.use(autorizationRoute)


app.listen(3000,()=>{
    console.log("server port 3000")
})