import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Stack,
  Autocomplete,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  FormHelperText,
  Alert,
  AlertTitle,
} from "@mui/material";
import { api } from "../utils/apiHelper";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const categoryOptions = [
  { label: "Pop Culture", value: "popCulture" },
  { label: "Party", value: "party" },
  { label: "Kinky", value: "kinky" },
  { label: "Family", value: "family" },
];

const NewGame = () => {
  const [selectedCategories, setSelectedCategories] = useState(
    categoryOptions.map((option) => option.value)
  );
  const [interactive, setInteractive] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { authUser, credentials } = useContext(UserContext);

  const validationErrors = () => {
    return (
      <Alert
        severity="error"
        sx={{
          margin: "1rem 0",
          width: "35rem",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser) {
      navigate(
        `/game?guest=true&categories=${selectedCategories.join(
          ","
        )}&interactive=${interactive}`
      );
    }

    const newGame = {
      categories: selectedCategories,
      userId: authUser.id,
      interactive,
    };

    try {
      const res = await api(`/games`, "POST", newGame, credentials);
      const data = await res.json();
      if (res.status === 201) {
        navigate(`/game?id=${data.id}`);
      } else if (res.status === 400) {
        setErrors(data.errors);
      } else if (res.status === 401) {
        navigate("/forbidden");
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <>
      {errors.length > 0 && validationErrors()}
      <Card sx={{ maxWidth: "65vw", padding: "1.5rem", width: "35rem" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{ fontWeight: "600" }}
          >
            Create New Game
          </Typography>
          <Divider sx={{ margin: "1.25rem 0" }} />
          <Stack spacing={4}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={categoryOptions}
              getOptionLabel={(option) => option.label}
              defaultValue={[...categoryOptions]}
              onChange={(event, newValue) => {
                setSelectedCategories(newValue.map((option) => option.value));
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Categories" />
              )}
            />
            <FormGroup>
              <FormControlLabel
                required
                control={
                  <Switch
                    onChange={(event) => {
                      setInteractive(event.target.checked);
                    }}
                  />
                }
                label="Interactive?"
              />
              <FormHelperText>
                Interactive mode allows you to enter guesses and keep score.
                Display mode only displays the cards.
              </FormHelperText>
            </FormGroup>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" size="medium" onClick={handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default NewGame;
