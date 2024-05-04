import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";

// eslint-disable-next-line react/prop-types
const StyledLogo = ({ xsDisplay, mdDisplay, variant }) => {
  return (
    <>
      <StyleIcon
        sx={{
          display: { xs: xsDisplay, md: mdDisplay },
          mr: 1,
          color: "primary.main",
        }}
      />
      <Typography
        variant={variant}
        noWrap
        component={Link}
        to="/"
        sx={{
          mr: 2,
          display: { xs: xsDisplay, md: mdDisplay },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          flexGrow: xsDisplay === "flex" ? 1 : 0,
        }}
      >
        INCOHERENT
      </Typography>
    </>
  );
};

export default StyledLogo;
