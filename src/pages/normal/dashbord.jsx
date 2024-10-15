import { Outlet } from "react-router-dom";

const Dashbord=()=>{
    return (
        <div>
    <h1>This is user Dashbord</h1>
    <Outlet/>
    </div>
)
}
export default Dashbord;