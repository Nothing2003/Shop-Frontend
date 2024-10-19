
import { useContext } from "react";
import UserProfileView from "../../components/normal/user.profile.view";
import UserContext from "../../context/user.context";
import { isLoggedIn } from "../../auth/helper.auth";
import { Navigate } from "react-router-dom";
const Profile=()=>{
    const userContext=useContext(UserContext)
    const userProfileView=()=>{
        return(
            <div>
            <div className="container mx-auto grid grid-cols-12 pt-2 pb-6">
               <div className="md:col-span-3"></div>
                   <div
                   className="col-span-full md:col-span-6 w-full p-4 bg-blue-100 hover:bg-blue-300 border-[3px] rounded-lg sm:p-6 md:p-9 dark:bg-gray-400 dark:hover:bg-gray-600 border-emerald-600 hover:border-emerald-800 transform transition-transform  scale-100 hover:scale-105 duration-300  shadow-2xl">
                       <UserProfileView 
                       user={userContext?.userData?.user}
                       />
                   </div>
                </div>
           </div>
        )
    }
    return  (isLoggedIn())?userProfileView():<Navigate to={"/login"}/>;
}
export default Profile;