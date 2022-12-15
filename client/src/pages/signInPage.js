import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useState,useEffect} from 'react';
import * as EmailValidator from 'email-validator';
import { handleRegister,handleLogin } from '../utils/apiCall';
import {useNavigate} from 'react-router-dom'



export default function SignIn() {
  const [error,setError]=useState("");
  const [errorVisible,setErrorVisible]=useState(false);
  const [loading,setLoading]=useState(false);
  let navigate=useNavigate();

  const validate=(data)=>{
    var clear=true;

    if(!EmailValidator.validate(data.get('email')))
    {
         clear=false;
         setError("Enter Correct Email")
    }
    
    if(data.get('password').length < 8)
    {
         clear=false;
         setError("Password Length should be greater")
    }

    return clear;

  }

  const handleSubmit =async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    if(validate(data))
    {
      setErrorVisible(false);
      setLoading(true);
      const res=await handleLogin({email : data.get('email'),password: data.get('password')});
      setLoading(false);
      console.log(res);
      if(res!=false)
      {
           localStorage.setItem("LoginToken",res?.payload?.token)
           navigate("/dashboard")
           
      }
    }else{
       setErrorVisible(true);
    }

  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
     
  
  );
}
