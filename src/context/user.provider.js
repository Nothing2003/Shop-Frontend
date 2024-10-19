import {  useEffect, useState } from "react"
import UserContext from "./user.context" 
import { doLogoutFromLocalStorage,doLoginLocalStorage, getDataFromLocalStorage, isLoggedIn } from "../auth/helper.auth"
import { isAdminUser as adminUser } from "../auth/helper.auth"
import { useNavigate } from "react-router-dom"
const UserProvider=({children})=>{
    
    const [isLogin,setIsLogin]=useState(false)
    const [userData,setUserData]=useState(null)
    const [isAdminUser,setIsAdminUser]=useState(false)
    useEffect(()=>{
        setIsLogin(isLoggedIn());
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage());
    },[])
    //login
    const doLogin=(data)=>{
        doLoginLocalStorage(data);
        setIsLogin(true);
        setIsAdminUser(adminUser());
        setUserData(getDataFromLocalStorage());
    }
    //logout 
    const doLogout=()=>{
        doLogoutFromLocalStorage();

        setIsLogin(false);
        setIsAdminUser(false);
        setUserData(null);
       
        
    }
    return(
        <UserContext.Provider value={
            {
                userData:userData,
                isLogin:isLogin,
                login:doLogin,
                logout:doLogout,
                isAdminUser:isAdminUser,

            }
        } >

            {children}
        </UserContext.Provider>
    )
}
export default UserProvider