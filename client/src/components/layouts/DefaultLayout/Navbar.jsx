import * as React from "react";
import { Box, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function Navbar() {
  return (
    <Box
      color={"text.primary"}
      fontSize="medium"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Button
        color={"inherit"}
        sx={{
          p: 1,
          fontSize: "inherit",
          textTransform: "none",
          "&:hover": {
            color: "#1976d2",
          },
        }}
      >
        <Link
          to="/device"
          underline="none"
          color={"inherit"}
          component={RouterLink}
        >
          Các thiết bị của bạn
        </Link>
      </Button>
    </Box>
  );
}

export default Navbar;
