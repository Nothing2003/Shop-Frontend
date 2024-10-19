import { json } from "react-router-dom";

// Save user data to localStorage
export const doLoginLocalStorage = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
};



// Get JWT token from localStorage
export const getTokenFromLocalStorage = () => {
    return getDataFromLocalStorage()?.jwtToken || null;
};

// Check if user is logged in
export const isLoggedIn = () => {
    const data=getDataFromLocalStorage();
    if(data===null){
        return false;
    }
    else{
        return true;
    }
};

// Fetch all data from localStorage
export const getDataFromLocalStorage = () => {
    const data = localStorage.getItem("userData");
    if(data!==null){
        return JSON.parse(data);
    }
    else{
        return null;
    }
};

// Remove user data from localStorage (Logout)
export const doLogoutFromLocalStorage = () => {
    localStorage.removeItem("userData");
};
// Fetch user data from localStorage
export const getUserFromLocalStorage = () => {
    const user=getDataFromLocalStorage()?.user ;
    if(user!==null){
        return user
    }
    else{
        return null;
    }
   
};
// Get refresh token from localStorage
export const getRefreshTokenFromLocalStorage = () => {
    return getDataFromLocalStorage()?.refreshToken || null;
};

// Check if the logged user is an admin
export const isAdminUser = () => {
    if (isLoggedIn()) {
        const user = getUserFromLocalStorage();
        if (user===null) {
            console.error("No user found in local storage");
            return false;
        }

        else{
            const roles = user.roles; 
            return roles.find(role => role.roleName === "ROLE_ADMIN");
        }
    }
   else{
    console.error("User is not logged in");
    return false;
   }
};
