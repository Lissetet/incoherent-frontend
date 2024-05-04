import { Typography, Button, ButtonGroup, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Home = () => {
  const { authUser } = useContext(UserContext);

  return (
    <Box
      component="section"
      sx={{
        minHeight: "calc(100vh - 20rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "4rem",
      }}
    >
      <Typography
        noWrap
        sx={{
          mr: 2,
          fontFamily: "Monoton",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "whitesmoke",
          textTransform: "uppercase",
          opacity: 0.75,
          fontSize: {
            xs: "clamp(2.2806973457336426rem/* 36.49115753173828px */, calc(2.2806973457336426rem/* 36.49115753173828px */ + ((3.732479999999999 - 2.2806973457336426) * ((100vw - 20rem/* 320px */) / (96 - 20)))), 3.732479999999999rem/* 59.71967999999998px */)",
            sm: "clamp(2.8865075781941414rem/* 46.18412125110626px */, calc(2.8865075781941414rem/* 46.18412125110626px */ + ((5.374771199999998 - 2.8865075781941414) * ((100vw - 20rem/* 320px */) / (96 - 20)))), 5.374771199999998rem/* 85.99633919999997px */)",
            md: "clamp(3.65323615365196rem/* 58.45177845843136px */, calc(3.65323615365196rem/* 58.45177845843136px */ + ((7.739670527999997 - 3.65323615365196) * ((100vw - 20rem/* 320px */) / (96 - 20)))), 7.739670527999997rem/* 123.83472844799995px */)",
          },
        }}
      >
        INCOHERENT
      </Typography>
      {!authUser ? (
        <ButtonGroup
          variant="contained"
          aria-label="Welcome navigation buttons"
          sx={{ width: "fit-content", margin: "0 auto" }}
        >
          <Button size="large" component={Link} to="/new_game">
            Play
          </Button>
          <Button size="large" component={Link} to="/signup">
            Sign Up
          </Button>
          <Button size="large" component={Link} to="/login">
            Login
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup
          variant="contained"
          aria-label="Welcome navigation buttons"
          sx={{ width: "fit-content", margin: "0 auto" }}
        >
          <Button size="large" component={Link} to="/last_game">
            Resume Game
          </Button>
          <Button size="large" component={Link} to="/new_game">
            New Game
          </Button>
          <Button size="large" component={Link} to="/logout">
            Logout
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};

export default Home;
