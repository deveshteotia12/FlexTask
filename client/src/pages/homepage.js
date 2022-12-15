import { Grid, Typography,Button } from '@mui/material';
import React,{useState,useEffect} from 'react'
import ResponsiveAppBar from '../component/navbar';
import Image from '../assets/images/photo.png'
import {ReactComponent as Dot} from '../assets/svg/dot.svg';
import { Link, Navigate, redirect } from 'react-router-dom';




const Homepage=()=>{
    const [isLoggedIn,setLoggedIn]=useState(false);

    useEffect(()=>{
      if(localStorage.getItem("LoginToken"))
      {
           setLoggedIn(true);
      }
    })
    const handelSignOut=()=>{
        console.log("hii")
        localStorage.removeItem("LoginToken")
        setLoggedIn(false);
    }
    return (
        <div style={{backgroundColor: '#2E4CFF', width: '100%', height: '100%',padding: "50px"}}>
            <ResponsiveAppBar></ResponsiveAppBar>
            <div style={{marginTop: "10px"}}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item md={5} xs={12} lg={6} display="flex" flexDirection="column" justifyContent="center">
                    
                            <Typography variant="h5" color="white" style={{fontWeight: "bold",fontSize: "40px"}} gutterBottom>
                                Yoga teaches you how <></>to listen to your body
                            </Typography>
                            <Typography color="white" gutterBottom>
                                Slow movements and deep breathing increase blood 
                                flow and warm up muscles, while holding a pose can 
                                build strength.
                            </Typography>
                            <div style={{marginTop: "20px"}}>
                                <Button style={{backgroundColor: "white"}}>
                                   <Link to="/dashboard" style={{textDecoration: 'none'}}> Dashboard</Link>
                                </Button>
                                <Button   style={{color: "white", outlineColor: "white", border: "solid 1px",marginLeft: "10px"}} variant="outlined">
                                    { !isLoggedIn ? 
                                      <Link to="/SignIn" style={{textDecoration: 'none', color: 'white'}}> Sign In</Link> 
                                      : <Link  style={{textDecoration: 'none', color: 'white'}} onClick={()=> handelSignOut()}>Sign Out</Link>
                                    } 
                                </Button>
                            </div>
 
                    </Grid>
                    <Grid item md={7} xs={12} lg={6} display="flex" justifyContent="center" alignItems="center">
                        <img src={Image} alt="image" style={{width: "300px", height: '380px', position: "relative",marginTop: "20px"}} ></img>
                        <Dot style={{}}></Dot>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Homepage;