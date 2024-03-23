import axios from "axios"
import { env } from "../config"

const api = axios.create({
    baseURL: env.VITE_URL_API_BACKEND
  });

export {api}




