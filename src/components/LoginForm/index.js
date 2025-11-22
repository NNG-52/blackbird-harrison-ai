import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';

function isValidPassword(password) {
  
  let has_atleast_8_characters = false;
  let has_uppercase = false;
  let has_lowercase = false;
  let has_digit = false;
  let has_special_char = false;
  const nonAlphanumeric = /[^a-zA-Z0-9 ]/

  // Password must be at least 8 characters long
  if (password.length > 8) {
      has_atleast_8_characters = True
  }
  for (const char in password) {
    if ('A' <= char <= 'Z') { // Check for uppercase
      has_uppercase = True        
    }  
    else if ('a' <= char <= 'z') { // Check for lowercase
        has_lowercase = True
    }
    
    if ('0' <= char <= '9') { // Check for digit
      has_digit = true;
    }
    if (nonAlphanumeric.test(char)) { // Check for special character
      has_special_char = true;
    }  
  }
  
  if (has_atleast_8_characters && has_uppercase && has_lowercase && has_digit && has_special_char) {
      return true;
  } else { 
    if (!has_atleast_8_characters) {
      console.log("Password must be at least 8 characters long");
    }  
    // Optional optimization: if both are found, we can stop early
    if (!has_uppercase || !has_lowercase) {
      console.log("Password must contain at least one uppercase letter and one lowercase letter");
    }
    if (!has_digit) {
      console.log("Password must contain at least one digit");
    }
    if (!has_special_char) {
      console.log("Password must contain at least one special character");
    }
    return false;
  }

    
}  

const validator = require("email-validator");

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);

  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Add validation code here
    // Validate email format with "email-validator" package
    
    if (validator.validate(email) && isValidPassword(password)) {
      setShowAlert(true);
    }


  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    validateForm(event);
    // setShowAlert("Login Successful");
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!validator.validate(email)}
              helperText={!validator.validate(email) ? "Invalid email format" : ""}
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
              error={!isValidPassword(password)}
              helperText={!isValidPassword(password) ? "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
