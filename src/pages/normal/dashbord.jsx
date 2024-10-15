import { Outlet } from "react-router-dom";
import Base from "../../components/Base";

const Dashbord=()=>{
    return (
        <Base>
        
            <div>
                <h1>This is user Dashbord</h1>
                <Outlet/>
            </div>

        </Base>
)
}
export default Dashbord;