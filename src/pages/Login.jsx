import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
  Stack,
  TextField,
  Alert,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Login = () => {
  const { actions, authUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const validationErrors = () => {
    return (
      <Alert
        severity="error"
        sx={{
          margin: "1rem 0",
          width: "25rem",
          maxWidth: "65vw",
          padding: "1.5rem",
        }}
      >
        {errors[0]}
      </Alert>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = location.state ? location.state.from : "/";

    const credentials = {
      username: email,
      password,
    };

    // API call to sign in the user. If successful, redirect to the previous page
    // If the user is not found, set the errors state
    try {
      const user = await actions.signIn(credentials);
      user
        ? navigate(from)
        : setErrors(["Sign-in was unsuccessful. Please try again."]);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <>
      {errors.length > 0 && validationErrors()}
      <Card sx={{ maxWidth: "65vw", padding: "1.5rem", width: "25rem" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{ fontWeight: "600" }}
          >
            Login
          </Typography>
          <Divider sx={{ margin: "1.25rem 0" }} />
          <Stack spacing={2}>
            <TextField
              id="email"
              label="Email Address"
              type="email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Login
            </Button>
            <Button variant="outlined" size="large" component={Link} to="/">
              Cancel
            </Button>
          </Stack>
          <Typography variant="body" component="div" align="center">
            Don&apos;t have an account?{" "}
            <Button variant="text" component={Link} to="/signup" size="small">
              Sign Up
            </Button>
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default Login;
