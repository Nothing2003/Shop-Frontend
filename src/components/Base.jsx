import { Link } from "react-router-dom";
import Footer from "./Footer";

const Base = ({ title = "Page Title", description = "Welcome to our shop", showButton=false ,buttonLink="/",buttonText=" ",children }) => {
    return (
        <div className="min-h-screen flex flex-col  ">
            <div className=" transition-transform duration-200 ease-in-out transform scale-10 mx-auto w-full bg-blue-200 py-4 px-4 border-2 hover:scale-105 border-yellow-300 rounded dark:bg-black dark:text-white shadow-lg h-40 flex flex-col justify-center items-center" >
                <div className=" flex flex-col justify-center items-center">
                <h3 className="text-center text-2xl font-bold py-2">{title}</h3>
                <p className="text-center text-lg py-2">{description&& description}</p>
                {showButton && (
                <Link to={buttonLink} className=" text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  dark:hover:bg-blue-900 dark:focus:ring-blue-800 flex  dark:bg-blue-600 text-center ">{buttonText}</Link>)}
                </div>
            
            </div>
            <main className="flex-grow bg-slate-300 text-black dark:text-white dark:bg-slate-700">{children}</main>
            <Footer />
        </div>
    );
};

export default Base;
