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
import { useUserStore } from "../../stores/userStore.ts";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { PopupModal } from "../../components/Common/PopupModal.tsx";
import { Link } from "react-router-dom";


export default function SignUp() {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormRegister>();
  const navigate = useNavigate();
  const queryPostRegister = QueryPostRegister();
  const userStore = useUserStore();

  const onSubmit: SubmitHandler<IFormRegister> = (registerRequest) => {
    if (registerRequest.password !== registerRequest.confirmPassword) {
      alert("Password and Confirm Password must be the same");
      return;
    }
    queryPostRegister.mutate(registerRequest, {
      onSuccess: () => {
        toast.info("Please check your email to verify your account before login.");
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      },
      onError: (error) => {
        toast.error("Something Wrong");
      }
    });
  };


  if (userStore?.isAuthenticated) {
    return <Navigate to="/home" />;
  }

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