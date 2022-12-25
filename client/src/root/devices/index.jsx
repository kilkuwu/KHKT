import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Loading from "components/Loading";
import { useAuth } from "providers/authProvider";

export default function Devices() {
  const [isLoading, setIsLoading] = useState();
  const [auth] = useAuth();
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch(`/api/user/${auth.user._id}/device`, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: "Bearer " + auth.token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) return [];
        return response.json();
      })
      .then((response) => {
        setDevices(response);
        setIsLoading(false);
      });
  }, [auth]);

  if (isLoading) return <Loading title={"Loading data..."} />;

  return (
    <Grid container columnSpacing={2} rowGap={2} mt={2}>
      {devices.map((device) => {
        return (
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: "#f5f5f5" }}>
              <CardActionArea component={RouterLink} to={device._id}>
                <CardContent>
                  <Typography
                    display={"flex"}
                    alignItems="center"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    <Avatar sx={{ mr: 1 }} src={device.picturePath}></Avatar>
                    {device.forPatient}
                    <Typography ml={"auto"}>{device.phoneNumber}</Typography>
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {device.information}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
