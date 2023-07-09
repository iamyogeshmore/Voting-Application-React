import { Avatar, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Copyright } from "@mui/icons-material";

const AdminLogin = () => {
  let navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  let admin = {
    emailId: emailId,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(admin);
    if (admin.emailId === "" || admin.password === "") {
      alert("Please provide login details.");
    } else {
      axios
        .post("http://localhost:8081/AdminPage/Login", admin)
        .then((responce) => {
          toast.success(responce.data.message);
          console.log(responce);
          localStorage.setItem("AdminID", responce.data.obj);
          console.log(localStorage.getItem("AdminID"));

          if (responce.data.message == "Login Successful") {
            setTimeout(() => {
              navigate("/Admin");
            }, 2000);
          } else {
            toast.success(responce.data);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Admin Login
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          onChange={(event) => {
            setEmailId(event.target.value);
          }}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="off"
          autoFocus
        />
        <TextField
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
        />

        <Button
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

        <Grid container>
          <Grid item xs>
            <Link
              onClick={() => {
                navigate("/ForgotPassword");
              }}
              variant="body2"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              onClick={() => {
                navigate("/");
              }}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default AdminLogin;
