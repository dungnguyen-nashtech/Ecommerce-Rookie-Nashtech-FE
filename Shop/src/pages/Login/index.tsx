import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./Copyright.tsx";
import { IFormLogin } from "../../payloads/interface/formInput.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommonValidation } from "../../payloads/variable/commonValidation.ts";
import { QueryPostLogin } from "../../services/queries/query-post.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../../stores/userStore.ts";
import { jwtDecode } from "jwt-decode";
import { PopupModal } from "../../components/Common/PopupModal.tsx";
import { Navigate } from "react-router";

export default function SignIn() {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormLogin>();
  const queryPostLogin = QueryPostLogin();
  const userStore = useUserStore();

  const onSubmit: SubmitHandler<IFormLogin> = (loginRequest) => {
    queryPostLogin.mutate(loginRequest, {
      onSuccess: (dataLoginResponse) => {
        userStore.addUserInfoAndLogin(jwtDecode(dataLoginResponse.accessToken));
        userStore.addToken(dataLoginResponse);
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };

  if (userStore?.isAuthenticated) {
    return <Navigate to="/home" />;
  }

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
            {...register("email", CommonValidation)}
            helperText={errors.email ? "Invalid Email" : ""}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            {...register("password", CommonValidation)}
            helperText={errors.password ? "Invalid Password" : ""}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
      <PopupModal />
    </Container>
  );
}