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
import { ISignUpForm } from "../interfacesTypes";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signUpUser } from "../APIServices/authAPIs";
import { AppContext } from "../context/AppContext";
import { setAuth } from "../APIServices";
import SnackBar from "../components/SnackBarComponent";
import { AxiosError } from "axios";

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const history = useNavigate();
  const { setUser } = useContext(AppContext);

  const { mutate, isLoading } = useMutation(signUpUser, {
    onSuccess: ({ data }) => {
      setUser({
        email: data.email,
        userRole: data.userRole,
        token: data.token,
        id: data._id,
      });
      setAuth();
      history("/login");
      SnackBar.success("Sign up successfully");
    },
    onError: (error: any) => {
      SnackBar.error(error.response?.data.errEmail);
      console.log("error", error);
    },
  });

  const handleSignUp = (data: ISignUpForm) => {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
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
        <Typography fontSize={20}>Sign Up</Typography>
        <form noValidate onSubmit={handleSubmit(handleSignUp)}>
          <TextField
            {...register("name", { required: true })}
            error={Boolean(errors.name)}
            fullWidth
            label="Name"
            type="text"
            variant="outlined"
            required
            autoFocus
            margin="normal"
          />
          <TextField
            {...register("email", { required: true })}
            error={Boolean(errors.email)}
            fullWidth
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
            {isLoading ? "signing up ..." : "Sign up"}
          </Button>
        </form>

        <Box mt={2}>
          <Link to="/login">Already have an account? Login</Link>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;
