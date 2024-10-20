// /image/v1/upload/user-image/{userId}

import { publicAxios } from "./axios.service"

//update User Profile Image
export const updateUserImage=(file,userId)=>{
    if (file===null) {
        return;
    }
    const data = new FormData();
    data.append("ImageRequest", file);

    return publicAxios.post(`/image/v1/upload/user-image/${userId}`,data);
}