import {Router} from 'express'
import { verifyToken } from '../utils/token-manager'
import { chatCompletionValidator, validate } from '../utils/validators'
import { deleteChats, generateChatCompletion, sendChatsToUser } from '../controllers/chat-controllers'

//Protected API
const chatRoutes = Router()

chatRoutes.post("/new", verifyToken, validate(chatCompletionValidator), generateChatCompletion)
chatRoutes.get("/all-chats",verifyToken, sendChatsToUser)
chatRoutes.delete("/delete", verifyToken, deleteChats)

export default chatRoutes