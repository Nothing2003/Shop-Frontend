// user related api call

import { publicAxios } from "./axios.service"

//register new user
export const registerUser= (registerData)=>{
   return publicAxios.post(`/users/v1`,registerData);
}
export const loginUser=  (loginData)=>{
   return publicAxios.post(`/auth/v1/generate-token`,loginData);
}