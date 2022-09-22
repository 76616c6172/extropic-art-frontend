import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Function for making API requests with axios
// for usage examples see: https://blog.sreejit.dev/custom-axios-hook-useaxios-in-typescript-react
const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      setResponse(result);
    } catch( err ) {
      // setError(err);
			// Do something
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = () => {
    fetchData(axiosParams);
  }

  useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams);
    }
  },[]);

  return { response, error, loading, sendRequest };
}

export default useAxios;