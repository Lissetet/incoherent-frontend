import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Stack,
  Alert,
  Autocomplete,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  FormHelperText,
  AlertTitle,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Snackbar,
  IconButton,
} from "@mui/material";
import { api } from "../utils/apiHelper";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import CloseIcon from "@mui/icons-material/Close";

const Contact = () => {
  const messageTypes = [
    { label: "Help", value: "help" },
    { label: "Feedback", value: "feedback" },
    { label: "Bug Report", value: "bug" },
    { label: "Suggestions", value: "suggestions" },
    { label: "Other", value: "other" },
  ];

  const { authUser } = useContext(UserContext);
  const [type, setType] = useState(messageTypes[0].value);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      type,
      subject,
      message,
    };
    authUser && (data.userId = authUser.id);

    try {
      const res = await api("/messages", "POST", data);
      if (res.status === 201) {
        setSubject("");
        setMessage("");
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: "65vw", padding: "1.5rem", width: "35rem" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{ fontWeight: "600" }}
          >
            Contact
          </Typography>
          <Divider sx={{ margin: "1.25rem 0" }} />
          <Stack spacing={2}>
            <FormControl fullWidth variant="standard" required>
              <InputLabel id="typeLabel">Message Type</InputLabel>
              <Select
                labelId="type"
                id="typeSelect"
                value={type}
                label="Message Type"
                onChange={(e) => setType(e.target.value)}
              >
                {messageTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="subject"
              label="Subject"
              variant="standard"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              id="message"
              label="Message"
              variant="standard"
              fullWidth
              multiline
              required
              value={message}
              minRows={4}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" size="medium" onClick={handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>Success</AlertTitle>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contact;
