import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterUser = () => {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  let user = {
    userName: userName,
    emailId: emailId,
    password: password,
    phoneNo: phoneNo,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/UserPage/Register_User", user)
      .then((responce) => {
        console.log(responce);
        toast.success(responce.data.message);
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                required
                margin="normal"
                fullWidth
                id="UserName"
                label="User Name"
                name="userName"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
                margin="normal"
                fullWidth
                id="Password"
                label="Paswword"
                type="password"
                name="pasword"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => {
                  setEmailId(event.target.value);
                }}
                required
                margin="normal"
                fullWidth
                id="emailId"
                label="Email Address"
                name="emailId"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => {
                  setPhoneNo(event.target.value);
                }}
                required
                margin="normal"
                fullWidth
                id="phoneNo"
                label="Phone No"
                name="phoneNo"
                autoComplete="off"
              />
            </Grid>

            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>

            <Grid Container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    navigate("/Login");
                  }}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <ToastContainer autoClose={2000} />
        </Box>
      </Container>
    </div>
  );
};

export default RegisterUser;
