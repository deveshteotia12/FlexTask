import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getSlotData, handelSlotsGet, handelSubscribe, successHandler } from '../utils/apiCall';



const Subscription=({data})=>
{
    const [slotData,setSlotData]=useState([]);
    const [subscribed,setSubscribed]=useState(false);
    const [slot, setSlot] = React.useState("");
    const [slotTiming,setSlotTiming]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
          const getUserData=async ()=>{
            const res=await handelSlotsGet();
            if(res.success)
            {
              setSlotData(res.payload);
            }else{
                window.alert("Some error has occured")
            }
          }
          getUserData();
    },[]);
    var getSlotBooked;
    useEffect(()=>{
        if(data?.subscriptionCheck)
        {
            setSubscribed(true);

             getSlotBooked=async ()=>{
               
                const res=await getSlotData({slotID: data?.subscribedSlot});
                if(res.success)
                {
                  console.log(res)
                  setSlotTiming(res.payload?.slotTiming);
                  
                }else{
                    console.log(res)
                    window.alert("Some error has occured")
                }
              }
           getSlotBooked();
        }
    },[data,subscribed])
    
    useEffect(()=>{
        if(data?.subscriptionCheck)
        {
            setSubscribed(true);

             getSlotBooked=async ()=>{
               
                const res=await getSlotData({slotID: data?.subscribedSlot});
                if(res.success)
                {
                  console.log(res)
                  setSlotTiming(res.payload?.slotTiming);
                  
                }else{
                    console.log(res)
                    window.alert("Some error has occured")
                }
              }
           getSlotBooked();
        }
    },[])
    

    const handleChange = (event) => {
        setSlot(event.target.value);
    };

    const handelSubmit=async (event)=>{
        event.preventDefault();
        console.log(slot)
        console.log(data)
        const res = await handelSubscribe({slotID: slot,userID: data._id})

        if(res.success)
        {
           successHandler("Successfully saved")
           console.log(res)
           setSubscribed(true);
           

        }else{


            localStorage.removeItem("LoginToken");
            navigate.push("/login")
        }

    }
    
    return(
        <div>
            <form onSubmit={handelSubmit}>
                <Grid container>
                    <Grid sm={8} md={6} lg={6} item>
                    {
                        subscribed ? <>
                        
                            <h4>You are already subscribed for this month.</h4>

                            <h4>Your Booked Slot Timing: {slotTiming}</h4>
                        
                        </> :
                    <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

                       <InputLabel id="slot-select-label">Slots</InputLabel>
                       <Select
                         labelId="slot-select-label"
                         id="slot-select"
                         value={slot}
                         label="slot"
                         onChange={handleChange}
                         style={{marginBottom: '10px'}}
                       >
                         {slotData.map((e) => (
                           <MenuItem value={e._id}>{e.slotTiming}</MenuItem>
                         ))}
                       </Select>
                        <TextField
                            id="name"
                            
                            type="text"
                            name="name"
                            label="Amount"
                            value={"500"}
                           // onChange={handleInputChange}
                            fullWidth
                           // style={{marginLeft: '10px'}}
                           style={{marginBottom: "40px"}}
                        />
                        <Button type="submit" variant='contained'> Subscribe</Button>
                      </FormControl>
                       
                      }
                    </Grid>

                </Grid>
            </form>
           
        </div>
    )
}


export default Subscription;