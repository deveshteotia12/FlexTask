import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from './constants';

export const instance = axios.create({
  baseURL: API_URL,
});

const instanceAuth= axios.create({
    baseURL: API_URL,
    headers: {
        Authorization : `Bearer ${localStorage.getItem("LoginToken")}`
    }
})

export const handleRegister = async (payload)=> {
  try {
    const res = await instance.post('/user/signUp', payload);
    if (!res.data.success) {
      handleError(res.data.message);
      return res.data;
    } else {
      const loginRes = await instance.post('/user/login', payload);
      if (!loginRes.data.success) {
        handleError(loginRes.data.message);
      }
      return loginRes.data;
    }
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const handleLogin = async (payload) => {
  try {
    const res = await instance.post('/user/login', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const handelUserGet = async ()=>{
    try{
        const res=await instanceAuth.get("/user/userInfo");
        return res.data;
    }catch(err){
        handleError('Oops! Something went wrong.');
        return false;
    }
}

export const handelUserData= async (payload)=>{
    try{
        const res=await instanceAuth.post("/user/userInfo",payload);

        if (!res.data.success) {
            handleError(res.data.message);
        }
        return res.data;
    }catch(error){
        handleError('Oops! Something went wrong.');
        return false;
    }
}
 
export const handelSlotsGet=async ()=>{
  try{
    const res=await instanceAuth.get("/slot/");

    if (!res.data.success) {
        handleError(res.data.message);
    }
    return res.data;
}catch(error){
    handleError('Oops! Something went wrong.');
    return false;
}
  
}

export const handelSubscribe=async (payload)=>{
  try{

    const res=await instanceAuth.post("/slot/subscribe",payload);

    if (!res.data.success) {
        handleError(res.data.message);
    }
    return res.data;
  }catch(error)
  {
    handleError('Oops! Something went wrong.');
    return false;
  }
}

export const getSlotData=async (payload)=>{
  try{

    const res=await instanceAuth.post("/slot/sendSlotData",payload);

    if (!res.data.success) {
        handleError(res.data.message);
    }
    return res.data;
  }catch(error)
  {
    handleError('Oops! Something went wrong.');
    return false;
  }

}
export const handleError=(error)=>{
    toast.error(error, { pauseOnHover: false })
}

export const successHandler = (msg) => {
  toast.success(msg, { pauseOnHover: false });
};