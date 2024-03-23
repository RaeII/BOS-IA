import {api} from "./api";  


export const loginRequest = async (data) => {   
    
    return await api.post(`/login`,data)
    .then(e => e.data)

}


