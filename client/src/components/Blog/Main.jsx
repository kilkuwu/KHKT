import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Main(props) {
  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8} rowGap={2}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Grid item xs={12}>
        {posts.map((post, index) => (
          <Card
            sx={{ my: 1, background: "rgb(0, 0, 0, .05)" }}
            direction="row"
            key={index}
            spacing={1}
            alignItems="center"
          >
            <CardActionArea component={RouterLink} to={`blog/${post.id}`}>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography noWrap variant="subtitle1">
                  {post.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
