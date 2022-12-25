import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Copyright from "components/Copyright";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 1,
        mt: "auto",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          color={"primary"}
          fontWeight={"bold"}
        >
          Pamonitor
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
          sx={{
            mt: 0,
            mb: 1,
          }}
        >
          Vì một cuộc sống tốt hơn!
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
