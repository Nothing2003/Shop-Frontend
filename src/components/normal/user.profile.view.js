import { Button, Typography } from "@mui/material";

const UserProfileView = ({ user = null }) => {
    
  return (
    <>
      {user && (
        <div className="container mx-auto p-4 ">

            {/* Profile image */}
            <div className="flex justify-center items-center mb-4">
                <img src={
                    (user.imageName===null)?"/images/defultProfile.jpg": user.imageName
                } 
                alt={user.name}
                className="rounded-full h-40 justify-center items-center" />
            </div>
            
          {/* User Name */}
          <Typography
            variant="h4"
            component="h1"
            className="text-center uppercase font-bold text-2xl sm:text-3xl lg:text-4xl mb-4"
          >
            {user.name}
          </Typography>

          <hr className="my-4" />

          {/* Profile Information */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            {/* Name */}
            <div className="flex flex-col items-start sm:items-center sm:flex-row justify-between border-b border-gray-500 py-2 transform transition-transform shadow-lg scale-100 hover:scale-105 duration-300 ">
              <span className="font-semibold text-lg bg-gray-900 text-white px-4 py-2 rounded-md w-full sm:w-1/3">
                Name
              </span>
              <span className="capitalize text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md w-full sm:w-2/3 mt-2 sm:mt-0 md:ml-2">
                {user.name}
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col items-start sm:items-center sm:flex-row justify-between border-b border-gray-500 py-2 transform transition-transform shadow-lg scale-100 hover:scale-105 duration-300 ">
              <span className="font-semibold text-lg bg-gray-900 text-white px-4 py-2 rounded-md w-full sm:w-1/3">
                Email
              </span>
              <span className="text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md w-full sm:w-2/3 mt-2 sm:mt-0 md:ml-2">
                {user.email}
              </span>
            </div>

            {/* Gender */}
            <div className="flex flex-col items-start sm:items-center sm:flex-row justify-between border-b border-gray-500 py-2 transform transition-transform shadow-lg scale-100 hover:scale-105 duration-300 ">
              <span className="font-semibold text-lg bg-gray-900 text-white px-4 py-2 rounded-md w-full sm:w-1/3">
                Gender
              </span>
              <span className="uppercase text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md w-full sm:w-2/3 mt-2 sm:mt-0 md:ml-2">
                {user.gender}
              </span>
            </div>

            {/* About */}
            <div className="flex flex-col items-start sm:items-center sm:flex-row justify-between border-b border-gray-500 py-2 transform transition-transform shadow-lg scale-100 hover:scale-105 duration-300 ">
              <span className="font-semibold text-lg bg-gray-900 text-white px-4 py-2 rounded-md w-full sm:w-1/3">
                About
              </span>
              <span className="capitalize text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md w-full sm:w-2/3 mt-2 sm:mt-0 md:ml-2">
                {user.about}
              </span>
            </div>
          </div>
          <hr className="my-4 "/>
          <div className="flex justify-center items-center space-x-3 pt-4 pb-4 text-center ">
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                
                                className="hover:scale-105"
                            >
                                Update
                            </Button>
                            <Button variant="contained" color="warning"   className="hover:scale-105 ">Orders</Button>
                        </div>
        </div>
      )}
    </>
  );
};

export default UserProfileView;
