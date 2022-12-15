import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { handelUserData, successHandler } from '../utils/apiCall'


const Information=({data})=>{
     console.log(data)
    const [formValues,setFormValues]=useState({
         name: '',
         email: '',
         age: '',
         contactNo: '',
         emergenctContact: '',
         gender: '',
         address: ''
    })
    const [error,setError]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    
    useEffect(()=>{
        setFormValues(
            {
                name: data?.name,
                email: data?.email,
                age: data.age,
                contactNo: data?.contactNo,
                emergencyContact: data?.emergencyContact,
                gender: data?.gender,
                address: data?.address
           }
        )
    },[data])

    const handelSetOption=(e)=>{
       console.log(e.target.value)
    }

    const handleInputChange=(e)=>{
  
      const {name,value}=e.target;
      setFormValues({
        ...formValues,
        [name]: value
      });

    
    }

    const validateData=()=>{
        var check=true;

        if(!formValues.name || formValues.name.trim().length < 2)
        {
           check=false;
           setError("Enter valid Name");
        }

        if(!formValues.age || Number(formValues.age)<18 || Number(formValues.age)>65)
        {
            check=false;
            setError("Enter valid Age");
        }

        if(!formValues.contactNo)
        {
            check=false;
            setError("Enter valid Contact Number");
        }
        if(!formValues.emergencyContact)
        {
            check=false;
            setError("Enter valid Emergency Contact Number");
        }
        if(!formValues.gender)
        {
            check=false;
            setError("Enter Gender");
        }
        return check;
    }

    const handelFormSubmit=async (e)=>{
        e.preventDefault();
        if(validateData())
        {
            setError("");
            console.log(data?.email)
            setIsLoading(true);
            const res=await handelUserData({
                email: data?.email, 
                name: formValues.name,
                age: formValues.age,
                contactNo: formValues.contactNo,
                emergencyContact: formValues.emergencyContact,
                gender: formValues.gender,
                address: formValues.address
            });
            if(res)
            {
                console.log(res);
                successHandler("Successfully Saved the Data")
            }
            console.log("valid Data")
            setIsLoading(false);
        }else{
            console.log("No valid Data")
        }
    }

    return (
        <div>
            <form onSubmit={(e)=>handelFormSubmit(e)} style={{margin: '30px'}}>
                {
                   error ?
                  <small>{error}</small> : null
                }  
               <Grid container>
                   <Grid item md={12} sx={{marginBottom: "20px"}} display="flex" >
                        <TextField
                            id="name"
                            label="Name"
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            fullWidth
                            style={{marginLeft: '10px'}}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="text"
                            name="email"
                            value={data?.email}
                            defaultValue={data?.email}
                           // onChange={handleInputChange}
                            style={{marginLeft: '10px'}}
                            fullWidth
                        />
                       
                   </Grid>
                   <Grid item md={12} display="flex" sx={{marginBottom: "20px"}} justifyContent="space-around">
                   <TextField
                            id="contact"
                            label="Contact No"
                            type="text"
                            name="contactNo"
                            value={formValues.contactNo}
                            onChange={handleInputChange}
                            fullWidth
                            style={{marginLeft: '10px'}}
                        />
                        <TextField
                            id="emergencycontact"
                            label="Emergency Contact No"
                            type="text"
                            name="emergencyContact"
                            value={formValues.emergencyContact}
                            onChange={handleInputChange}
                            fullWidth
                            style={{marginLeft: '10px'}}
                        />
                   </Grid>
                   <Grid item md={12} display="flex" sx={{marginBottom: "20px"}} justifyContent="space-around">
                       <TextField
                            id="age"
                            label="Age"
                            type="text"
                            name="age"
                            value={formValues.age}
                            //defaultValue={formValues.age}
                            onChange={handleInputChange}
                            fullWidth
                            style={{marginLeft: '10px'}}
                        />
                        <TextField
                            id="gender"
                            label="Gender"
                            type="text"
                            name="gender"
                            value={formValues.gender}
                            onChange={handleInputChange}
                            fullWidth
                            style={{marginLeft: '10px'}}
                        />
                   </Grid>
                   <Grid item md={12} display="flex" sx={{marginBottom: "50px"}} justifyContent="space-around">
                       <TextField
                            id="address"
                            label="Address"
                            type="text"
                            name="address"
                            value={formValues.address}
                            onChange={handleInputChange}
                            fullWidth
                            style={{marginLeft: '10px'}}
                        />
                        {/* <TextField
                            id="emergencycontact"
                            label="Emergency Contact No"
                            type="text"
                            name="emergencyContact"
                            value={formValues.emergencyContact}
                            onChange={handleInputChange}
                            fullWidth
                            style={{marginLeft: '10px'}}
                            selected
                        /> */}
                   </Grid> 
                    <Button type="submit" style={{backgroundColor: '#2E4CFF',color: 'white', padding: '15px',width: "100%"}} disabled={isLoading}>
                        Save
                    </Button>
               </Grid>
              
            </form>
        </div>
    )
}

export default Information;
