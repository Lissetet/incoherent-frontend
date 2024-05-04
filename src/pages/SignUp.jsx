import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Stack,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

const SignUp = () => {
  const { actions, authUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    // API call to create the user. If successful, sign in the user and redirect to the home page
    // If the api call returns a 400 status code, set the errors state
    // If there is a server error, redirect to the error page
    try {
      const res = await api("/users", "POST", user);
      if (res.status === 201) {
        await actions.signIn({
          username: email,
          password,
        });
        navigate("/");
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

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
        <AlertTitle sx={{ fontWeight: 700 }}>Validation Errors</AlertTitle>
        {errors.map((error, index) => {
          return <li key={index}>{error}</li>;
        })}
      </Alert>
    );
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
            Sign Up
          </Typography>
          <Divider sx={{ margin: "1.25rem 0" }} />
          <Stack spacing={2}>
            <TextField
              id="firstName"
              label="First Name"
              variant="standard"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="standard"
              onChange={(e) => setLastName(e.target.value)}
            />
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
              Sign Up
            </Button>
            <Button variant="outlined" size="large" component={Link} to="/">
              Cancel
            </Button>
          </Stack>
          <Typography variant="body" component="div" align="center">
            Already have a user account?{" "}
            <Button variant="text" component={Link} to="/login" size="small">
              Login
            </Button>
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default SignUp;
