import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { api } from "../utils/apiHelper";
import {
  KinkyBg,
  PartyBg,
  PopCultureBg,
  FamilyBg,
} from "../components/Backgrounds";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
  TextField,
  IconButton,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import UserContext from "../context/UserContext";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { credentials } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [game, setGame] = useState({});
  const [card, setCard] = useState({});
  const [cardFace, setCardFace] = useState("clue");
  const [answerViewed, setAnswerViewed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [guessText, setGuessText] = useState(null);
  const [guess, setGuess] = useState(null);
  const [alertType, setAlertType] = useState("error");
  const [guestCards, setGuestCards] = useState([]);
  const [guestScore, setGuestScore] = useState(0);

  let { guest, categories, id, interactive } = Object.fromEntries(
    new URLSearchParams(location.search)
  );
  interactive = interactive === "true";

  useEffect(() => {
    if (guest) {
      const fetchCards = async () => {
        try {
          const res = await api(`/cards?categories=${categories}`);
          const data = await res.json();
          setGuestCards(data);
          setCard(data[0]);
        } catch (error) {
          console.log(error);
          navigate("/error");
        }
      };
      fetchCards();
    } else {
      const fetchGame = async () => {
        try {
          const res = await api(`/games/${id}`, "GET", null, credentials);
          const data = await res.json();
          setGame(data);
        } catch (error) {
          console.log(error);
          navigate("/error");
        }
      };
      const fetchCard = async () => {
        try {
          const res = await api(
            `/cards/random?gameId=${id}`,
            "GET",
            null,
            credentials
          );
          const data = await res.json();
          setCard(data);
        } catch (error) {
          console.log(error);
          navigate("/error");
        }
      };
      fetchGame();
      fetchCard();
    }
  }, [guest, categories, navigate, credentials, id]);

  const background = {
    kinky: <KinkyBg />,
    party: <PartyBg />,
    popCulture: <PopCultureBg />,
    family: <FamilyBg />,
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handleFlip = () => {
    cardFace === "clue" ? setCardFace("answer") : setCardFace("clue");
    setAnswerViewed(true);
  };

  const updateGame = async (newScore) => {
    try {
      await api(
        `/games/${id}`,
        "PUT",
        { score: newScore, usedCardId: card.id },
        credentials
      );
      setGame({ ...game, score: newScore });
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleNextCard = () => {
    if (guest) {
      const currentCard = guestCards.indexOf(card);
      if (currentCard === guestCards.length - 1) {
        setOpen(true);
      } else {
        setCard(guestCards[currentCard + 1]);
        setCardFace("clue");
      }
    } else {
      if (alertType !== "success") {
        updateGame(game.score);
      }
      const fetchCard = async () => {
        try {
          const res = await api(
            `/cards/random?gameId=${id}`,
            "GET",
            null,
            credentials
          );
          const data = await res.json();
          setCard(data);
          setCardFace("clue");
        } catch (error) {
          console.log(error);
          navigate("/error");
        }
      };
      fetchCard();
    }
    setGuess(null);
    setAnswerViewed(false);
  };

  const handleGuess = async () => {
    setGuess(guessText);
    if (guessText.toLowerCase() === card.answer.toLowerCase()) {
      setFeedback("Correct!");
      setAlertType("success");
      setCardFace("answer");
      setAnswerViewed(true);
      if (guest) {
        setGuestScore(guestScore + 1);
      } else {
        const newScore = game.score + 1;
        updateGame(newScore);
      }
    } else {
      setFeedback("Incorrect, try again");
      setAlertType("error");
    }
  };

  return (
    <Stack spacing={3}>
      {(game.interactive || interactive) && (
        <Typography
          variant="h4"
          sx={{ fontWeight: "600", margin: "2rem", textAlign: "center" }}
        >
          Score: {game.score || guestScore}
        </Typography>
      )}
      <Card
        sx={{
          maxWidth: "65vw",
          width: "22rem",
          height: "30rem",
          maxHeight: "65dvh",
        }}
        onClick={handleFlip}
      >
        {cardFace === "clue" ? (
          <>
            <CardContent sx={{ padding: "2rem 0 3rem 0" }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "600", margin: "0 2rem" }}
              >
                {card.clue}
              </Typography>
            </CardContent>
            {background[card.category]}
          </>
        ) : (
          <CardContent sx={{ padding: "0" }}>
            <Typography variant="h4" sx={{ fontWeight: "600", margin: "2rem" }}>
              {card.answer}
            </Typography>
            <Stack
              spacing={1}
              backgroundColor="text.primary"
              color="whitesmoke"
              width="60%"
              sx={{ padding: ".5rem 2rem", marginBottom: "2rem" }}
            >
              <Typography
                variant="body"
                sx={{ fontWeight: "600", margin: "0 2rem" }}
              >
                HINT
              </Typography>
              <Typography variant="body" sx={{ margin: "0 2rem" }}>
                {card.hint}
              </Typography>
            </Stack>
            <Stack spacing={1} sx={{ margin: "2rem" }}>
              <Typography variant="body">{card.definition}</Typography>
            </Stack>
          </CardContent>
        )}
      </Card>
      {guess && <Alert severity={alertType}>{feedback}</Alert>}
      {(game.interactive || interactive) && !answerViewed ? (
        <Card sx={{ maxWidth: "65vw", width: "22rem" }}>
          <CardContent sx={{ padding: "1rem 1rem 0 1.5rem" }}>
            <Stack
              alignItems="center"
              spacing={1}
              direction="row"
              sx={{ marginBottom: "1rem" }}
            >
              <TextField
                id="standard-basic"
                label="Enter a guess"
                variant="standard"
                sx={{ flexGrow: 1 }}
                onChange={(e) => setGuessText(e.target.value)}
              />
              <IconButton aria-label="Submit guess" onClick={handleGuess}>
                <CheckIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Button
          variant="contained"
          sx={{ width: "100%", margin: "2rem 0" }}
          onClick={handleNextCard}
        >
          Next Card
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thanks for playing!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To play a longer game or to save scores, sign up for an account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" component={Link} to="/signup" autoFocus>
            Sign Up
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Game;
