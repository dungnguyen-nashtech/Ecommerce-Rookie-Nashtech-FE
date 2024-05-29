import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IFormLogin, IFormRegister } from "../../payloads/interface/formInput.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommonValidation } from "../../payloads/variable/commonValidation.ts";
import { QueryPostLogin, QueryPostRegister } from "../../services/queries/query-post.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PopupModal } from "../../components/PopupModal.tsx";
import { useUserStore } from "../../stores/userStore.ts";
import { jwtDecode } from "jwt-decode";
import { CloudUploadIcon } from "lucide-react";
import { Input } from "@mui/material";
import axiosInstance from "../../config/axiosInstance.ts";

export default function SignUp() {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormRegister>();

  const queryPostRegister = QueryPostRegister();
  const userStore = useUserStore();

  const onSubmit: SubmitHandler<IFormRegister> = (registerRequest) => {
    queryPostRegister.mutate(registerRequest);
    if (queryPostRegister.isSuccess) {
      userStore.addUserInfoAndLogin(jwtDecode(queryPostRegister.data?.accessToken));
      userStore.addToken(queryPostRegister.data);
    } else if (queryPostRegister.isError) {
      toast.error(queryPostRegister.error.message);
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
          Sign up
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
          <TextField
            {...register("password", CommonValidation)}
            helperText={errors.password ? "Invalid Password" : ""}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
          />
          <TextField
            {...register("confirmPassword", CommonValidation)}
            helperText={errors.password ? "Invalid Confirm Password" : ""}
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
          />
          <TextField
            {...register("firstName", CommonValidation)}
            helperText={errors.password ? "Invalid First Name" : ""}
            margin="normal"
            required
            fullWidth
            label="First Name"
          />
          <TextField
            {...register("lastName", CommonValidation)}
            helperText={errors.password ? "Invalid Last Name" : ""}
            margin="normal"
            required
            fullWidth
            label="Last Name"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
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