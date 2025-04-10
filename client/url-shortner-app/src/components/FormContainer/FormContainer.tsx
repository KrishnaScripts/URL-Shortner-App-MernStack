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
        <div className='container mx-auto p-2'>
        <div className="bg-[url('/backgroundImage.avif')] my-8 rounded-xl bg-cover bg-center">
        <div className='w-full h-full rounded-xl p-20 backdrop-brightness-50'>
            <h2 className='text-white text-4xl text-center pb-4'> Welcome to Your URL Shortener</h2>
            <p className='text-white text-center pb-2 text-xl font-extralight'>Simplify your links in seconds.</p>
            <p className='text-white text-center pb-4 text-sm font-thin'> Turn long, messy URLs into short, shareable ones with ease. Whether you're sharing on social media, tracking clicks, or just keeping things tidy—our tool is fast, free, and user-friendly.</p>
            <form onSubmit={handleSubmit}>
                <div className='flex'>
                    <div className='relative w-full'>
                        <div className='absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800'>UrlShortner link /</div>
                        <input 
                            type='text' 
                            placeholder='add your link hear' 
                            required 
                            className="block w-full p-4 ps-35 text-sm text-gray-400 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                            value={fullUrl}
                            onChange={(e)=>setFullUrl(e.target.value)}
                        />
                        <button type='submit' className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'>Shorten URL</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        <ToastContainer />
      </div>
    )
}

export default FormContainer;

