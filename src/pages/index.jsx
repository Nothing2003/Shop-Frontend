import { toast } from "react-toastify";
import Base from "../components/Base";
import axios from "axios";
function Index(){
    function showSeccessMessage(){
        toast.success("This is success message"
        )
    }
    const getDataFromServer = ()=>{
        toast.info("Getting data from server")
        axios.get("http://localhost:9090/users/v1").then((response)=>{
            console.log(response.data)
            toast.success("Request Done")
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
        })

    }
    return (
        <Base 
        title="Shop What you need" 
        description={"Welcome to Trending Store, We provide best items as your need."} 
        showButton={true} 
        buttonLink="/store"
        buttonText="Shop Now"
        
        >
        <div className="space-x-2 space-y-2">
        <h1>
            Working on home page
        </h1>
        <button className="text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4  text-center dark:hover:bg-green-900 dark:focus:ring-green-800 flex  dark:bg-green-600 py-2" onClick={showSeccessMessage}> Tostifai</button>
        <button className="text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:hover:bg-green-900 dark:focus:ring-green-800 flex  dark:bg-green-600" onClick={getDataFromServer}>Get data from Fake API</button>
        </div>
        </Base>
    )
}
export default Index;