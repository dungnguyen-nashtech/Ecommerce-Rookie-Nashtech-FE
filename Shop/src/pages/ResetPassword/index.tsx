import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommonValidation } from "../../payloads/variable/commonValidation.ts";
import "react-toastify/dist/ReactToastify.css";
import { PopupModal } from "../../components/Common/PopupModal.tsx";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../config/axiosInstance.ts";

interface IFormResetPassword {
  password: string;
  repeatPassword: string;
  otp: string;
}

export default function ResetPassword() {

  const { code, email } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormResetPassword>();
  const onSubmit: SubmitHandler<IFormResetPassword> = async (forgotPasswordRequest) => {
    if (forgotPasswordRequest.password !== forgotPasswordRequest.repeatPassword) {
      alert("Password and Repeat Password must be the same");
      return;
    }

    const response = await axiosInstance.post(`/auth/forgot-password/${email}`, {
      password: forgotPasswordRequest.password,
      repeatPassword: forgotPasswordRequest.repeatPassword,
      otp: code
    });

    if (response?.status === 200) {
      alert("Password has been reset");
      navigate("/sign-in");
    }
  };

  return (
    <Container style={{ marginTop: "8rem" }} component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            {...register("password", CommonValidation)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Password"
            name="password"
            type="password"
            autoFocus
          />
          <TextField
            {...register("repeatPassword", CommonValidation)}
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"/forgot-password"}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/sign-up"}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <PopupModal />
    </Container>
  );
}