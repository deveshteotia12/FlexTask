import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {ReactComponent as Logo} from '../assets/svg/logo.svg';
import { Grid } from '@mui/material';

function ResponsiveAppBar() {

  return (
    <Grid container  alignItems="center" justifyContent="space-between">
        <Grid item md={8}>
            <Logo ></Logo>
        </Grid>
        <Grid item md={4} display="flex" justifyContent="space-around">
           <Typography color="white">ABOUT</Typography>
           <Typography color="white">CLASS</Typography>
           <Button style={{backgroundColor: "white"}}>CONTACT US</Button>
        </Grid>
    </Grid>
  );
}
export default ResponsiveAppBar;