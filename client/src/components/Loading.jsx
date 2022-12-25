import { Box, Typography, CircularProgress, Container } from "@mui/material";

export default function Loading({ title }) {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        height: "100%",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Box textAlign="center" alignItems="center">
        <CircularProgress color="secondary" />
        <Typography>{title}</Typography>
      </Box>
    </Container>
  );
}
