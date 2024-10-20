// user related api call

import { privateAxios, publicAxios } from "./axios.service"

//register new user
export const registerUser= (registerData)=>{
   return publicAxios.post(`/users/v1`,registerData);
}
export const loginUser=  (loginData)=>{
   return publicAxios.post(`/auth/v1/generate-token`,loginData);
}
export const getUserDataFromServerById=(userId)=>{
   return publicAxios.get(`users/v1/${userId}`);
}
export const updateUserInServer=(user,userId)=>{
   return privateAxios.put(`users/v1/${userId}`,user);
}