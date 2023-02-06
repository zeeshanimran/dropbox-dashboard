import { FC, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../interfacesTypes";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { userLogin } from "../APIServices/authAPIs";
import { setAuth } from "../APIServices";
import { AppContext } from "../context/AppContext";
import SnackBar from "../components/SnackBarComponent";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const history = useNavigate();
  const { setUser } = useContext(AppContext);
  const { mutate, isLoading } = useMutation(userLogin, {
    onSuccess: (response) => {
      setUser({
        email: response.data.data.email,
        token: response.data.data.token,
        name: response.data.data.name,
        id: response.data.data._id,
      });
      setAuth();
      history("/home");
      SnackBar.success("Login successfully");
    },
    onError: (error) => {
      SnackBar.error("invalid email or password");
      console.log(error);
    },
  });
  const onSubmit = (data: ILoginForm) => {
    if (data) {
      mutate({
        email: data.email,
        password: data.password,
      });
    }
  };

  useEffect(() => {
    setUser(null);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        mt={9}
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        flexDirection="column"
      >
        <Avatar
          sx={{
            bgcolor: "#1976d2",
            mb: "15px",
          }}
        >
          <LockIcon />
        </Avatar>
        <Typography fontSize={20}>Login</Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email", { required: true })}
            error={Boolean(errors.email)}
            fullWidth
            autoFocus
            label="Email"
            type="email"
            variant="outlined"
            required
            margin="normal"
          />
          <TextField
            margin="normal"
            {...register("password", { required: true, min: 8 })}
            error={Boolean(errors.password)}
            fullWidth
            required
            label="Password"
            type={isVisible ? "text" : "password"}
            variant="outlined"
            inputProps={{
              autoComplete: "off",
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setIsVisible(!isVisible);
                  }}
                >
                  {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              ),
            }}
          />

          <Button
            disabled={isLoading}
            sx={{
              mt: 2,
            }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isLoading ? "signing in..." : "Sign in"}
          </Button>
        </form>

        <Box mt={2}>
          <Link to="/signUp">Don't have an account? Sign Up</Link>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
