
import { useContext, useState } from "react";
import Base from "../components/Base"
import { Typography, TextField, Button, Radio, FormControlLabel, RadioGroup, FormControl, CircularProgress, FormGroup, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/user.service";
import UserContext from "../context/user.context";
const Login=()=>{
    const redirect= useNavigate();
    const userContext=useContext(UserContext);
    //data state
    let[data,setData]= useState({
        email:'',
        password:''

    })
    // error state
    const [errorh, setError] = useState({
        isError: false,
        errorData: null
    });
    //clear data
    const clearData = () => {
        setData({
            
            email: '',
            password: '',
        });
        setError({ isError: false, errorData: null }); // Clear error messages
    };
    // handle Change
    const handleChange = (event, property) => {
        setData({
            ...data,
            [property]: event.target.value
        });
    };
    
    //submit Form handle
    const submitForm = (e) => {
        e.preventDefault();
        // setLoading(true); // Start loading
        //cliend validation
        if(data.email===undefined||data.email.trim()===''){

            toast.error("Email is required")
            return;
        }
        if(data.password===undefined||data.password.trim()===''){

            toast.error("Password is required")
            return;
        }
        setLoading(true) //stating loading
        loginUser(data)
        .then((data)=>{
            console.log(data)
            toast.success("Logging In")
            setError({
                errorData:null,
                isError:false
            })
            userContext.login(data.data)
            redirect('/users/profile')
           
        })
        .catch((error)=>{
            // console.log(error.response.data.massage)
            toast.error('Invalid username and password')
            
            setError({
                errorData:error,
                isError:true
            })
        })
        .finally(()=>{
            setLoading(false) //stop loading
        })
       
        
    };

    
    // Loading state
    const [loading, setLoading] = useState(false); 
    const loginForm=()=>{
        return(
            <div className="container mx-auto grid grid-cols-12 pt-2 pb-6">
            <div className="md:col-span-3"></div>
            <div
             className="col-span-full md:col-span-6 w-full p-4 bg-white hover:bg-gray-300 border-t-[10px] rounded-lg sm:p-6 md:p-9 dark:bg-gray-500 dark:hover:bg-gray-600 border-blue-600 transform transition-transform shadow-lg scale-100 hover:scale-105 duration-300 ">
                <div className="pb-4 flex flex-col justify-center items-center space-x-3 text-center">
                    <img src="/images/shop.jpeg" alt="Shop Logo" className="h-24 w-24 dark:bg-white rounded-full dark:border-gray-500 border-[4px] border-blue-500" />
                    <Typography variant="h4" className="pt-2 text-black dark:text-white">STORE LOGIN HERE</Typography>
                </div>
                {/* {JSON.stringify(userContext)} */}
                <hr />
                <form onSubmit={submitForm}>
                        {/* Email Login Field */}
                        <div className="p-4">
                            <Typography variant="button" className="pt-2 pb-1">Enter your Email</Typography>
                            <TextField
                                type="email"
                                variant="outlined"
                                inputMode="email"
                                fullWidth
                                onChange={(event) => handleChange(event, 'email')}
                                value={data.email}
                                required
                            />
                            {/* <p className="text-red-500 text-[12px] h-5">{errorData.errorData?.email}</p> */}
                        </div>
                        <div className="p-4">
                            <Typography variant="button" className="pt-2 pb-1">Enter your password</Typography>
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                onChange={(event) => handleChange(event, 'password')}
                                value={data.password}
                                required
                            />
                            {/* <p className="text-red-500 text-[12px] h-5">{errorData.errorData?.email}</p> */}


                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex  space-x-3 t ">
                             Forget password
                            <Link to="/forget" className="text-blue-700 hover:underline dark:text-blue-500 px-1 underline">Click Here</Link>
                            </div>
                        </div>
                        <div className="flex justify-center items-center space-x-3 pt-3 pb-4 text-center">
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                disabled={loading} 
                                startIcon={loading && <CircularProgress size={20} />} 
                                className="hover:scale-105"
                            >
                                {loading ? "Login..." : "Login"}
                            </Button>
                            <Button variant="outlined" color="error"   disabled={loading} onClick={clearData} className="hover:scale-105 hover:bg-red-400 hover:text-white">Reset</Button>
                        </div>
                </form>
                
                
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex justify-center hover:scale-105 items-center space-x-3 pt-3 text-center underline">
                    You are not signup?
                    <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500 px-1 hover:scale-105">Signup</Link>
                </div>
            </div>
        </div>
        )
    }

    return(
        <Base
        title="MyShop / Login"
        description="Login Here"
        >
        {loginForm()}
        </Base>
    )
}
export default Login