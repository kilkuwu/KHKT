import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/authProvider";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";

function Header({ showLogInButton = true }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const processLogOut = () => {
    localStorage.removeItem("pamonitor-accessToken");
    setAuth({
      user: null,
      token: null,
    });
    toast("Logged out successfully!", {
      type: "success",
      autoClose: 1000,
    });
  };

  const goToLogInPage = () => {
    navigate("/login");
  };

  const goToProfilePage = () => {
    navigate(`/profile/${auth.user._id}`);
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Avatar src={"/logo192.png"} sx={{ mr: 1, cursor: "pointer" }} />
        <Typography
          component="h2"
          variant="h5"
          color="primary"
          align="left"
          noWrap
          fontWeight="bold"
          sx={{ flex: 1, cursor: "pointer" }}
        >
          Pamonitor
        </Typography>

        <IconButton>
          <SearchIcon />
        </IconButton>
        {showLogInButton ? (
          !auth.token ? (
            <Button variant="outlined" size="small" onClick={goToLogInPage}>
              LOG IN
            </Button>
          ) : (
            <>
              <Avatar
                src={auth.user.picturePath}
                sx={{ mr: 1, cursor: "pointer" }}
                onClick={goToProfilePage}
              />
              <Button variant="outlined" size="small" onClick={processLogOut}>
                LOG OUT
              </Button>
            </>
          )
        ) : (
          <></>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
