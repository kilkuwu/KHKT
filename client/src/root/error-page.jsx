import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box>
      <Typography textAlign={"center"} variant="h4" fontWeight={"bold"} mt={10}>
        Đã có lỗi xảy ra!
      </Typography>
      <Typography textAlign={"center"} variant="h5" fontWeight={"light"} m={2}>
        Code: {error.status}
      </Typography>
      <Typography textAlign={"center"} variant="h6" fontWeight={"light"}>
        {error.error?.message}
      </Typography>
    </Box>
  );
}
