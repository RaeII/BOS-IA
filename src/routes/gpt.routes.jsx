import { api } from "./api";

export const getAllAgentsGpt = async () => {

    return await api.get(`/gpt/behavior`).then(e => e.data.content)
}


