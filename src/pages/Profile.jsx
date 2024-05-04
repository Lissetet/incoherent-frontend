import {
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  IconButton,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0, width: "200px" }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const Profile = () => {
  const navigate = useNavigate();
  const { authUser, credentials } = useContext(UserContext);
  const { firstName, lastName, email } = authUser;
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - games.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const profileRows = [
    { display: "Name", value: `${firstName} ${lastName}` },
    { display: "Email", value: email },
    { display: "Games Played", value: games.length },
  ];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await api(`/games`, "GET", null, credentials);
        const data = await res.json();
        setGames([...data, ...data, ...data, ...data, ...data, ...data]);
        console.log(data);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };
    fetchGames();
  }, [credentials, navigate]);

  return (
    <Stack spacing={6} sx={{ margin: "1.5rem 0" }}>
      <Card sx={{ maxWidth: "65vw", padding: "1.5rem", width: "40rem" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{ fontWeight: "600" }}
          >
            Welcome {firstName}!
          </Typography>
          <Divider sx={{ margin: "1.25rem 0" }} />
          <TableContainer>
            <Table size="small" aria-label="User information">
              <TableBody>
                {profileRows.map((row) => (
                  <TableRow key={row.display}>
                    <TableCell sx={{ fontWeight: 700, borderBottom: 0 }}>
                      {row.display}
                    </TableCell>
                    <TableCell sx={{ borderBottom: 0 }}>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="text"
            size="large"
            sx={{ width: "100%", marginTop: "1rem" }}
            onClick={() => console.log("hello")}
          >
            Edit User Information
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: "65vw", padding: "1.5rem", width: "40rem" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{ fontWeight: "600" }}
          >
            Game History
          </Typography>
          <Divider sx={{ margin: "1.25rem 0" }} />

          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Categories</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Used Cards</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? games.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : games
                ).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.categories.join(", ")}</TableCell>
                    <TableCell>
                      {row.interactive ? "Interactive" : "Display"}
                    </TableCell>
                    <TableCell>{row.score}</TableCell>
                    <TableCell>{row.usedCards.length}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={games.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Profile;
