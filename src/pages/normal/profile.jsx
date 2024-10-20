import { useContext, useEffect, useState } from "react";
import UserProfileView from "../../components/normal/user.profile.view";
import UserContext from "../../context/user.context";
import { isLoggedIn } from "../../auth/helper.auth";
import { Navigate, useParams } from "react-router-dom";
import { getUserDataFromServerById, deactivateUserAccount, updateUserInServer } from "../../services/user.service";
import { toast } from "react-toastify";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Transition } from "@headlessui/react";
import { updateUserImage } from "../../services/image.service";

const Profile = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [image,setImage]=useState({
    placeholder:'/images/defultProfile.jpg',
    file:null
  })
  const [error, setError] = useState({
    isError: false,
    errorData: null
});
  useEffect(() => {
    userDataFromServer();
  }, []);
  const [loading, setLoading] = useState(false); 
  // Fetch user data from server
  const userDataFromServer = () => {
    getUserDataFromServerById(userId)
      .then((response) => {
        if (response && response.data) {
          // Check if the response and data are valid
          console.log(response.data);
          setUser(response.data); // Safely set user data
        } else {
          toast.error("No data found for the user!");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong loading data from the server!");
        console.log(error);
      });
  
  };

  // Handle modal open
  const handleOpenModel = () => {
    setOpen(true);
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  // Handle input changes for editing user fields
  const updateFieldHandler=(event,property)=>{
    setUser({
      ...user,
      [property]:event.target.value
    })

  }
  //update handler 
  // Update user data handler
const updateUserData = () => {
  if (user.password === " " || user.password === undefined || user.password === null || user.password === "") {
    toast.error("Use a valid password");
    return;
  }
  
  setLoading(true);
  
  updateUserInServer(user, userId)
    .then((updatedUser) => {
      if (updatedUser) {
        console.log(updatedUser);
        toast.success("User Data is updated");
        setError({ errorData: null, isError: false });
        if(image.file!==null){
          updateUserImage(image.file, user.userId);
        }
         
         handleClose()
      }
    })
    
    .catch((error) => {
      console.log(error);
      toast.error("Something went wrong! User Data is not updated");
      setError({
        errorData: error?.response?.data,
        isError: true,
      });
      handleClose();
    })
    .finally(() => {
      setLoading(false);
    });
};
  //Image Change
  const handelProfileImageChange=(event)=>{
    const localFile=event.target.files[0]
    if (localFile.type==='image/png'||localFile.type==='image/jpeg'||localFile.type==='image/jpg') {
      const reader=new FileReader();
          reader.onload=(r)=>{
            setImage({
              placeholder:r.target.result,
              file:localFile
            })
            
          }
      reader.readAsDataURL(localFile)
    }
    else{
      toast.error("Invaid file type")
      image.file=null
    }

  }
  //clear image 
  const clearImage=(event)=>{
    setImage({
      placeholder: '/images/defultProfile.jpg',
      file:null
    })
    toast.success("Image file is clear")

  }
  // Modal view for editing user details
  const updateViewModel = () => {
    if (!user) return null; // Ensure editableUser is available

    return (
      <Transition
        show={open}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        as="div"
      >
      
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="modal-title">Update User Profile</DialogTitle>
          
          <DialogContent>
            <div className="container mx-auto p-4">
              <div className="flex flex-col">
              <label htmlFor="profileImage"> Profile Image</label>
              <div className="grid grid-cols-3 ">
              <input type="file" id="profileImage" className="pt-2 col-span-2" onChange={handelProfileImageChange}/>
              <Button variant="outlined" color="secondary" className="col-span-1" onClick={clearImage}>Clear Image</Button>
              </div>
              {/* {image preview} */}
              <div className="justify-center items-center">
              <img src={image.placeholder} alt="" className="h-40 justify-center items-center w-40"/>
              </div>
              
              </div>

              {/* Name Field */}
              <TextField
                label="Name"
                name="name"
                value={user.name || ""}
                onChange={(event)=>updateFieldHandler(event,"name")}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <p className="text-red-500 text-[12px] h-5">{error.errorData?.name}</p>
              {/* Email Field */}
              <TextField
                label="Email"
                name="email"
                value={user.email || ""}
                disabled
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <p className="text-red-500 text-[12px] h-5">{error.errorData?.email}</p>

              {/* Passord Field */}
              <TextField
                label="New Password"
                name="password"
                type="password"
                value={user.password ||""}
                onChange={(event)=>updateFieldHandler(event,"password")}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <p className="text-red-500 text-[12px] h-5">{error.errorData?.password}</p>


              {/* Gender Field */}
              <TextField
                label="Gender"
                name="gender"
                value={user.gender || ""}
                onChange={(event)=>updateFieldHandler(event,"gender")}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <p className="text-red-500 text-[12px] h-5">{error.errorData?.gender}</p>

              {/* About Field */}
              <TextField
                label="About"
                name="about"
                value={user.about || ""}
                onChange={(event)=>updateFieldHandler(event,"about")}
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              <p className="text-red-500 text-[12px] h-5">{error.errorData?.about}</p>

            </div>
          </DialogContent>

          <DialogActions className="bg-gray-50 px-4 py-3 sm:px-6 ">
            <Button onClick={handleClose} className="mt-3 w-full sm:w-auto">
              Cancel
            </Button>
            <Button
                variant="contained"
                onClick={updateUserData}
                disabled={loading} 
                startIcon={loading && <CircularProgress size={20} />} 
              className="w-full justify-center rounded-md  text-white  sm:w-auto sm:ml-3"
            >
              {loading ? "Updating..." : "Save Changes"}
              
            </Button>
            
          </DialogActions>
        </Dialog>
        
      </Transition>
    );
  };

  // Render the profile view with the edit button
  const renderProfileView = () => {
    return (
      <div className="container mx-auto grid grid-cols-12 pt-2 pb-6">
        <div className="md:col-span-3"></div>
        <div className="col-span-full md:col-span-6 w-full p-4 bg-blue-100 hover:bg-blue-300 border-[3px] rounded-lg sm:p-6 md:p-9 dark:bg-gray-400 dark:hover:bg-gray-600 border-emerald-600 hover:border-emerald-800 transform transition-transform scale-100 hover:scale-105 duration-300 shadow-2xl">
          <UserProfileView user={user} handleOpenModel={handleOpenModel} />
          {updateViewModel()}
        </div>
      </div>
    );
  };

  return isLoggedIn() ? renderProfileView() : <Navigate to="/login" />;
};

export default Profile;
