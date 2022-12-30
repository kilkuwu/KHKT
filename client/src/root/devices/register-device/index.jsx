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
import { useNavigate } from "react-router-dom";
import { useAuth } from "providers/authProvider";

export default function RegisterDevice() {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const finalData = {};
    for (const [key, val] of data.entries()) {
      finalData[key] = val;
    }
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

    if (!finalData.phoneNumber.match(phoneRegex)) {
      return toast("Số điện thoại không hợp lệ", {
        type: "error",
      });
    }

    const response = await fetch("/api/device/register", {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: "Bearer " + auth.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const responseData = await response.json();

    if (!response.ok)
      return toast(responseData.msg, {
        type: "error",
      });

    toast("Đăng ký thiết bị thành công!", {
      type: "success",
    });

    navigate("/");
  };

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
          Đăng ký thiết bị
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="id"
                label="ID thiết bị"
                name="id"
                autoComplete="device-id"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="forPatient"
                label="Tên bệnh nhân"
                name="forPatient"
                autoComplete="patient-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                label="Số điện thoại"
                id="phoneNumber"
                autoComplete="0999999999"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="picturePath"
                label="Ảnh"
                id="picturePath"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                name="information"
                label="Thông tin thêm"
                id="information"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ĐĂNG KÝ
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" component={RouterLink} variant="body2">
                Đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
