import OpenAI from "openai"
import User from "../models/User";

const openai = new OpenAI({
    apiKey: `${process.env.OPENAI_API_KEY}`,
})


export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;

    try {

        const user = await User.findById(res.locals.jwtData.id);
    if(!user) return res.status(401).json({message: "User not registered OR Token malfunctioned"})

    const chats = user.chats.map(({role, content}) => {
        role, content
    })

    // grab chats of user
    chats.push({ content: message, role: "user"})
    user.chats.push({content:message, role: "user"})

    //send all chats with new one to openAI API
    const chatResponse = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages: chats,
    })

    user.chats.push(chatResponse.data.choices[0].message)
    await user.save()

    return res.status(200).json({chats: user.chats})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went wrong"})
    }

    

}

export const sendChatsToUser = async (req,res,next) =>{
    try {
        
        const user = await User.findById(res.locals.jwtData.id)

        if(!user) return res.status(401).send("User not registered OR token malfunctioned")

        console.log(user.chats)
        return res.status(201).json({message: "OK", chats: user.chats })
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: 'ERROR', cause: error.message})
    }
}

export const deleteChats = async (req,res,next) =>{
    try {
        
        const user = await User.findById(res.locals.jwtData.id)

        if(!user) return res.status(401).send("User not registered OR token malfunctioned")

        user.chats = []
        await user.save()
        return res.status(200).json({message: "OK"})
    } catch (error) {
        console.log(error);
        return res.status(201).json({message: 'ERROR', cause: error.message})
    }
}

