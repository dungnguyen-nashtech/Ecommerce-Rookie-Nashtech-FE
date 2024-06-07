import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IFormRegister } from "../../payloads/interface/formInput.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommonValidation } from "../../payloads/variable/commonValidation.ts";
import { QueryPostRegister } from "../../services/queries/query-post.ts";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { PopupModal } from "../../components/Common/PopupModal.tsx";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.ts";


export default function ForgotPassword() {

  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();
  const navigate = useNavigate();
  const queryPostRegister = QueryPostRegister();

  const onSubmit: SubmitHandler<IFormRegister> = async (registerRequest) => {
    const response = await axiosInstance.post(`mail/send-forgot-password/${registerRequest.email}`);
    if (response?.status === 200) {
      alert("Please check your email to get the verification code");
    }
  };

  return (
    <Container style={{ marginTop: "8rem", marginBottom: "5rem" }} component="main" maxWidth="xs">
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            {...register("email", CommonValidation)}
            helperText={errors.email ? "Invalid Email" : ""}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Verification Code To My Email
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"/forgot-password"}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/sign-in"}>
                {"Have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <PopupModal />
    </Container>
  );
}