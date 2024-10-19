import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Base from "../../components/Base";
import { isLoggedIn } from "../../auth/helper.auth";




const Dashbord = () => {
    
    

    const dashbordView = () => {
        return (
            <Base
                title="MyShop / User Dashboard"
                description=""
            >
                <div>
                    {/* <h1>This is the user Dashboard</h1> */}
                    <Outlet />
                </div>
            </Base>
        );
    };

    return  (isLoggedIn())?dashbordView():<Navigate to={"/login"}/>;
};

export default Dashbord;
