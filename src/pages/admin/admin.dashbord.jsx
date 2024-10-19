import { Navigate, Outlet } from "react-router-dom"
import Base from "../../components/Base"
import { isAdminUser } from "../../auth/helper.auth"

const AdminDashboard=()=>{
    const AdminDashboardView=()=>{
        return(
            <Base
            title="MyShop / Admin Dashboard"
            >
                <h1>This is admin DashBord</h1>
                <Outlet/>
            </Base>
        )
    }
    return (
        (isAdminUser())? AdminDashboardView() :<Navigate to="/users/home"/>
    )
}
export default AdminDashboard