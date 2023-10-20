import {Router} from 'express'
import userRoutes from './userRoutes'
import chatRoutes from './chatRoutes'

const appRouter = Router()

appRouter.use("/user",userRoutes)
appRouter.use("/chat",chatRoutes)

export default appRouter;