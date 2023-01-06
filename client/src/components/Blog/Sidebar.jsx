import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Card, CardActionArea, CardContent, Icon } from "@mui/material";

function Sidebar(props) {
  const { description, social, title } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network, id) => (
        <Link href={network.link} key={id} sx={{ mb: 0.5 }}>
          <Card
            sx={{ color: "inherit" }}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <CardActionArea>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon sx={{ mr: 2, color: "black" }}>
                  <network.icon />
                </Icon>
                <Typography>
                  <span>{network.name}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  description: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Sidebar;
