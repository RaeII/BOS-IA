import { api } from "./api";

export const getAllChats = async (data) => {

    return await api.get(`/chat`,data).then(e => e.data.content)
}

export const getMessagesChat = async (chatId) => {

    return await api.get(`/chat_message?chat_id=${chatId}`).then(e => e.data.content)
}

export const createChat = async (data) => {

    return await api.post(`/chat`,data).then(e => e.data.content)
}

export const createMessageUserChat = async (data) => {

    console.log('CREATE MESSAGE USER    ',data)

    return await api.post(`/chat_message`,data).then(e => e.data.content)
}

export const createMessageGptChat = async (data) => {

    console.log('DATA GPT REQUEST',data)
    //return 'resposta gpt'

    return await api.post(`/gpt/chat`,data).then(e => e.data.content)
}


