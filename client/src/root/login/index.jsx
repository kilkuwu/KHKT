import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "providers/authProvider";

export default function Login() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const finalData = {};
    for (const [key, val] of data.entries()) {
      finalData[key] = val;
    }
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const responseData = await response.json();

    if (!response.ok)
      return toast(responseData.msg, {
        type: "error",
      });

    setAuth(responseData);
    localStorage.setItem("pamonitor-accessToken", responseData.token);
    toast("Đăng nhập thành công!", {
      type: "success",
      autoClose: 1000,
    });
    navigate("/");
  };

  if (auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập với tài khoản của bạn
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Địa chỉ Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" component={RouterLink} variant="body2">
                Không có tài khoản? Đăng ký
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
