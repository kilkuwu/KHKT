import { Box, Link, Typography } from "@mui/material";
import { useAuth } from "providers/authProvider";
import { Link as RouterLink } from "react-router-dom";

export default function Protected({ children }) {
  const [auth] = useAuth();
  if (auth.token) return <>{children}</>;

  return (
    <Box>
      <Typography component="h2" textAlign={"center"} variant="h5" mt={10}>
        Bạn phải{" "}
        <Link component={RouterLink} to="/login">
          đăng nhập
        </Link>{" "}
        trước khi xem trang này!
      </Typography>
    </Box>
  );
}
