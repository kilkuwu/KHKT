import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";

function Main(props) {
  const { posts, title } = props;
  const [_posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all(posts.map((_post) => fetch(_post)))
      .then((fetchedPosts) =>
        Promise.all(fetchedPosts.map((fetchedPost) => fetchedPost.text()))
      )
      .then((textPosts) => setPosts(textPosts));
  }, [posts]);

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {_posts.map((post, index) => (
        <Markdown className="markdown" key={index}>
          {post}
        </Markdown>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
