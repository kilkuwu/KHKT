import { Typography, Link } from "@mui/material";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://pamonitor.cf/">
        Pamonitor
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
