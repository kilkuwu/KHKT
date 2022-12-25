import { Box, Typography, Container, Icon } from "@mui/material";
import { DoDisturbAlt } from "@mui/icons-material";

export default function Forbidden({ title }) {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Box textAlign="center" alignItems="center">
        <Icon sx={{ scale: "3", mb: 4, color: "#dd0000" }}>
          <DoDisturbAlt />
        </Icon>
        <Typography>{title}</Typography>
      </Box>
    </Container>
  );
}
