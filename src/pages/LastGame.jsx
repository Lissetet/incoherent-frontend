import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

const LastGame = () => {
  const { credentials } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api(`/games/last`, "GET", null, credentials);
        const { id } = await res.json();
        navigate(`/game?id=${id}`);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };
    fetchGame();
  }, [navigate, credentials]);
};

export default LastGame;
