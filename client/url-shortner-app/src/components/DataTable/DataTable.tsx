import React from "react";
import { UrlData } from "../../interface/UrlData";
import { Link } from "react-router-dom";
import { serverUrl } from "../../helpers/Contants";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

interface IDataTableProps {
  data: UrlData[];
  updateReloadState: () => void;
}

const Datatable: React.FC<IDataTableProps> = ({ data, updateReloadState }) => {

  const copyToClipboard = async(url:any)=>{
    try{
      await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
      toast.success("Copy");
    }catch(error){
      toast.error("Something wrong in Copy")
    }
  }
  const deleteUrl = async(id:any)=>{
    await axios.delete(`${serverUrl}/shortUrl/${id}`);
    updateReloadState(); 
  }

  const renderTableData = () => {
    return data.map((item, index) => (
      <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <td className="px-6 py-4 break-all">
            <Link to={item.fullUrl.toString()} 
              target="_blank" 
              rel="noreferer noopener"
            >
            {item.fullUrl}
            </Link>
        </td>
        <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">
            <Link to={`${serverUrl}/shortUrl/${item.shortUrl}`} 
              target="_blank" 
              rel="noreferer noopener"
              onClick={()=>{updateReloadState()}}
            >
            {item.shortUrl}
            </Link>
        </td>
        <td className="px-6 py-4">{item.clicks}</td>
        <td className="px-6 py-4">
        <button className="text-blue-500 mr-2 hover:underline" onClick={()=>{copyToClipboard(item.shortUrl)}}>Copy</button>
        <button className="text-red-500 hover:underline" onClick={()=>{deleteUrl(item._id)}}>Delete</button>
        </td>
      </tr>
    ));
  };

 
  return (
    // <div className="container mx-auto pt-2 pb-10">
    //   <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
    //     <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500">
    //       <thead className="text-md uppercase text-gray-50 bg-gray-700">
    //         <tr>
    //           <th scope="col" className="px-6 py-3 w-6/12">Full URL</th>
    //           <th scope="col" className="px-6 py-3 w-3/12">Short URL</th>
    //           <th scope="col" className="px-6 py-3">Clicks</th>
    //           <th scope="col" className="px-6 py-3">Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {renderTableData()}
    //       </tbody>
    //     </table>
    //   </div>
    //   <ToastContainer />
    // </div>
    <div className="container mx-auto pt-2 pb-10">
    {/* Desktop Table */}
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg hidden sm:block">
      <table className="w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-md uppercase text-gray-50 bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 w-6/12">Full URL</th>
            <th scope="col" className="px-6 py-3 w-3/12">Short URL</th>
            <th scope="col" className="px-6 py-3">Clicks</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  
    {/* Mobile Table */}
    <div className="block sm:hidden space-y-4">
    {!data.length && <p className="text-center text-red-500">No data available (mobile view)</p>}

    {data.map((item, index) => (
      <div key={index} className="bg-white rounded-lg shadow p-4 text-sm">
        <table className="w-full text-sm text-gray-500">
          <tbody>
            <tr className="bg-gray-100">
              <td className="font-semibold text-gray-700 py-2">Full URL:</td>
              <td className="text-blue-600 break-all">
                <Link to={item.fullUrl.toString()} target="_blank" rel="noreferrer noopener">
                  {item.fullUrl}
                </Link>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="font-semibold text-gray-700 py-2">Short URL:</td>
              <td className="text-blue-500 break-words">
                <Link to={`${serverUrl}/shortUrl/${item.shortUrl}`} target="_blank" rel="noreferrer noopener" onClick={() => updateReloadState()}>
                  {item.shortUrl}
                </Link>
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="font-semibold text-gray-700 py-2">Clicks:</td>
              <td>{item.clicks}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="font-semibold text-gray-700 py-2">Action:</td>
              <td className="flex gap-4 pt-2">
                <button className="text-blue-500 hover:underline" onClick={() => copyToClipboard(item.shortUrl)}>Copy</button>
                <button className="text-red-500 hover:underline" onClick={() => deleteUrl(item._id)}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ))}
  </div>
  
    <ToastContainer />
  </div>
  
  );
};

export default Datatable;
