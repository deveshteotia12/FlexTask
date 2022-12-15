import { IndeterminateCheckBoxSharp } from '@mui/icons-material';
import { Grid } from '@mui/material'
import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { handelSlotsGet } from '../utils/apiCall';

const Slots=()=>{

     const [slotData,setSlotData]=useState();
    const navigate=useNavigate();
     useEffect(()=>{
          const getUserData=async ()=>{
            const res=await handelSlotsGet();
            if(res)
            {
               console.log("HERE")
             console.log(res.payload)
              setSlotData(res.payload);
            }else{
               localStorage.removeItem("LoginToken");
               navigate.push("/login")
            }
          }
          getUserData();
        },[]);
     
    return(
        <Grid container display={'flex'} justifyContent="space-around">
          {
               slotData?.map((data,index)=>
                <Grid key={index} item md={2} lg={4} display={'flex'} alignItems='center' justifyContent={'center'} style={{height: "10vh",backgroundColor: '#2E4CFF',margin: "10px",borderRadius: '3px'}}>
                  <h3 style={{color: "white",marginRight: "10px"}}>{data.slotTiming}</h3>
                  <p style={{color: "white"}}>Subscribers: {data?.users?.length || 0}</p>
                </Grid>
               )
          }
          
        </Grid>
      
    )
}


export default Slots;