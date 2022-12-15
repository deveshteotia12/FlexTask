import * as React from 'react';
import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, Grid, TextField } from '@mui/material';
import Information from '../component/information';
import { handelSlotsGet, handelUserGet, handleError } from '../utils/apiCall';
import { useNavigate } from 'react-router-dom';
import Slots from '../component/slots';
import Subscription from '../component/subscription';
import {ReactComponent as Dot} from '../assets/svg/dot.svg';




const drawerWidth = 240;


export default function PermanentDrawerLeft() {
   const [option,setOption]=useState(0);
   const [data,setData]=useState("");
 
   const [canMove,setCanMove]=useState(false);
   const navigate = useNavigate();

   useEffect(()=>{
     const getUserData=async ()=>{
       const res=await handelUserGet();
       if(res.success)
       {
          console.log(res)
          setData(res.payload);
          if(res.payload?.detailsUpload)
          {
               setCanMove(true);
          }
       }else{
          if(res.message== 'Authentication failure')
          {
            handleError("Please Authenticate")
            localStorage.removeItem("LoginToken");
            navigate.push("/login")
          }else{
            handleError("Some Error has occured")
          }
       }
     }
     getUserData();
   },[]);
  

  

   const handelSetOption=(e)=>{
      if(canMove)
      {
        setOption(e.target.value);
      }
   }
   

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
         <Toolbar>
          <Typography variant="h6" noWrap component="div">
             <h3 style={{textAlign: 'center'}}>Yoga</h3>
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {['Your Information','Available Slots','Subscription'].map((text, index) => (
            // <ListItem key={text} disablePadding>
            //   <ListItemButton  onClick={(e)=>handelSetOption(e,"value")}>
            //     <ListItemIcon>
            //       {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            //     </ListItemIcon>
            //        <ListItemText primary={text} />
            //   </ListItemButton>
            // </ListItem>
            <div key={index}>
                <Button style={{width:"100%"}}  value={index} onClick={(e)=> handelSetOption(e)}>{text}</Button>
            </div>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {
            option==0 ?   <Information data={data}></Information> : 
            option==1 ?   <Slots></Slots> :
            option==2 ?   <Subscription data={data}></Subscription>  :
            null
        }
      </Box>
    </Box>
  );
}
