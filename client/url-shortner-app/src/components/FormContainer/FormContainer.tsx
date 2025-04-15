import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Contants";
import { ToastContainer, toast } from 'react-toastify';

interface IFormContainerProps {
  updateReloadState: ()=>void;
}

const FormContainer: React.FC<IFormContainerProps> = ({ updateReloadState }) => {

    const[fullUrl,setFullUrl] = useState("");

    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        try{
            await axios.post(`${serverUrl}/shortUrl`,{
                fullUrl:fullUrl
            });
            setFullUrl("");
            updateReloadState();
        }catch(error:any){
            toast.error(error.response.data.message);
        }
    }

    return(
        <div className="container mx-auto px-4 py-4">
            <div className="bg-[url('/backgroundImage.avif')] my-8 rounded-xl bg-cover bg-center">
                <div className="w-full h-full rounded-xl px-4 py-10 sm:px-10 md:p-20 backdrop-brightness-50">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl text-center pb-4">
                    Welcome to Your URL Shortener
                </h2>
                <p className="text-white text-center pb-2 text-base sm:text-lg font-extralight">
                    Simplify your links in seconds.
                </p>
                <p className="text-white text-center pb-4 text-sm font-thin max-w-3xl mx-auto">
                    Turn long, messy URLs into short, shareable ones with ease. Whether you're sharing on social media,
                    tracking clicks, or just keeping things tidy—our tool is fast, free, and user-friendly.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="w-full">
                        <div className="relative w-full">
                        {/* Label on the left inside input */}
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-800 text-xs sm:text-sm">
                            UrlShortner link /
                        </div>

                        {/* Input field with space for button */}
                        <input
                            type="text"
                            placeholder="add your link here"
                            required
                            className="block w-full py-3 pl-32 pr-36 text-sm text-gray-800 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                            value={fullUrl}
                            onChange={(e) => setFullUrl(e.target.value)}
                        />

                        {/* Desktop button inside input */}
                        <div className="hidden sm:block absolute top-1/2 right-2 -translate-y-1/2">
                            <button
                            type="submit"
                            className="h-10 px-4 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                            Shorten URL
                            </button>
                        </div>
                    </div>

                        {/* Mobile button below input */}
                        <div className="block sm:hidden mt-3">
                        <button
                            type="submit"
                            className="w-full py-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Shorten URL
                        </button>
                        </div>
                        </div>
                </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
            
    )
}

export default FormContainer;

