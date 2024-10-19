import { Form, Link } from "react-router-dom";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/user.service";
import { Typography, TextField, Button, Radio, FormControlLabel, RadioGroup, FormControl, CircularProgress } from "@mui/material"; // CircularProgress added

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        conformPassword: '',
        gender: '',
        about: '',
    });

    const [errorData, setErrorData] = useState({
        isError: false,
        errorData: null
    });

    // Loading state
    const [loading, setLoading] = useState(false); // Loading state added

    // Change handler
    const handleChange = (event, property) => {
        setData({
            ...data,
            [property]: event.target.value
        });
    };

    // Clear handler
    const clearData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            conformPassword: '',
            gender: '',
            about: '',
        });
        setErrorData({ isError: false, errorData: null }); // Clear error messages
    };

    // Form submission
    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Validation checks
        if (data.password !== data.conformPassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        registerUser(data)
            .then(userData => {
                // console.log(userData);
                toast.success("User created successfully!!");
                clearData();
            })
            .catch(error => {
                setErrorData({
                    isError: true,
                    errorData: error.response.data // Extract only relevant error data
                });
                toast.error("Error in creating user! Try again.");
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    const registerForm = () => {
        return (
            <div className="container mx-auto grid grid-cols-12 pt-2 pb-6">
                <div className="md:col-span-3"></div>
                <div className="col-span-full md:col-span-6 w-full p-4 bg-white hover:bg-gray-300 border-t-[10px] rounded-lg sm:p-6 md:p-8 dark:bg-gray-500 dark:hover:bg-gray-600 border-blue-600 transform transition-transform shadow-lg scale-100 hover:scale-105 duration-300">
                    <div className="pb-4 flex flex-col justify-center items-center space-x-3 text-center">
                        <img src="/images/shop.jpeg" alt="Shop Logo" className="h-24 w-24 dark:bg-white rounded-full dark:border-gray-500 border-[4px] border-blue-500" />
                        <Typography variant="h4" className="pt-2 text-black dark:text-white">STORE SIGNUP HERE</Typography>
                    </div>
                    <hr />
                    
                    <form onSubmit={submitForm}>
                        {/* Name */}
                        <div className="p-4">
                            <Typography variant="button" className="pt-2 pb-1">Your Name</Typography>
                            <TextField
                                color="primary"
                                variant="outlined"
                                inputMode="text"
                                fullWidth
                                onChange={(event) => handleChange(event, 'name')}
                                value={data.name}
                                required
                            />
                            <p className="text-red-500 text-[12px] h-5">{errorData.errorData?.name}</p>
                        </div>
                        {/* Email */}
                        <div className="p-4">
                            <Typography variant="button" className="pt-2 pb-1">Your Email</Typography>
                            <TextField
                                type="email"
                                variant="outlined"
                                inputMode="email"
                                fullWidth
                                onChange={(event) => handleChange(event, 'email')}
                                value={data.email}
                                required
                            />
                            <p className="text-red-500 text-[12px] h-5">{errorData.errorData?.email}</p>
                        </div>
                        {/* Password */}
                        <div className="p-4">
                            <Typography variant="button" className="pt-2 pb-1">Enter new password</Typography>
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                onChange={(event) => handleChange(event, 'password')}
                                value={data.password}
                                required
                            />
                            <p className="text-red-500 text-[12px] h-5">{errorData.errorData?.password}</p>
                        </div>
                        {/* Confirm Password */}
                        <div className="p-4">
                            <Typography variant="button" className="pt-2 pb-1">Re-enter Password</Typography>
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                onChange={(event) => handleChange(event, 'conformPassword')}
                                value={data.conformPassword}
                                required
                            />
                        </div>
                        {/* Gender */}
                        <div className="p-4">
                            <FormControl component="fieldset">
                                <Typography variant="body1">Select Gender</Typography>
                                <RadioGroup
                                    row
                                    value={data.gender}
                                    onChange={(event) => handleChange(event, 'gender')}
                                    required
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </FormControl>
                            <p className="text-red-500 text-[12px] h-5">{errorData.errorData?.gender}</p>
                        </div>
                        {/* About */}
                        <div className="p-4">
                            <Typography variant="body1">Write something about yourself</Typography>
                            <TextField
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                onChange={(event) => handleChange(event, 'about')}
                                value={data.about}
                                required
                            />
                            <p className="text-red-500 text-[12px] h-5">{errorData.errorData?.about}</p>
                        </div>
                        {/* Submit and Reset Buttons */}
                        <div className="flex justify-center items-center space-x-3 pt-3 pb-4 text-center">
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                disabled={loading} 
                                startIcon={loading && <CircularProgress size={20} />} 
                                className="hover:scale-105"
                            >
                                {loading ? "Signing Up..." : "Signup"}
                            </Button>
                            <Button variant="outlined" color="error" onClick={clearData} disabled={loading}  className="hover:scale-105 hover:bg-red-400 hover:text-white">Reset</Button>
                        </div>
                    </form>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex justify-center items-center space-x-3 pt-3 text-center underline">
                        Already registered?
                        <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500 px-1">Login</Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Base title="MyShop / Register" description="Fill the form correctly to register with us!!">
            {registerForm()}
        </Base>
    );
};

export default Register;
