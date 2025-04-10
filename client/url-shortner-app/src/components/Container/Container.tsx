import { useEffect, useState } from 'react';
import FormContainer from '../FormContainer/FormContainer';
import { UrlData } from '../../interface/UrlData';
import axios from 'axios';
import { serverUrl } from '../../helpers/Contants';
import Datatable from '../DataTable/DataTable';

const Container = ()=>{
  const [data,setData] = useState<UrlData[]>([]);
  const [reload,setReload] = useState<boolean>(false);

  const updateReloadState = ()=>{
    setReload(true);
  }
  
  const featchData = async()=>{
    const response = await axios.get(`${serverUrl}/shortUrl`);
    setData(response.data);
    setReload(false);
  }

  useEffect(()=>{
    featchData();
  },[reload])
  
  return(
    <>
    <FormContainer updateReloadState={updateReloadState}/>
    <Datatable data={data} updateReloadState={updateReloadState}/>
    </>
  )
}

export default Container;


