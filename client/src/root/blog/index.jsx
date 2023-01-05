import { Paper } from "@mui/material";
import Markdown from "components/Blog/Markdown";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  return params.blogId;
}

export default function Blog() {
  const blogId = useLoaderData();
  const [post, setPost] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const fetchedPost = await fetch(`/blogs/${blogId}.md`);
      const textPost = await fetchedPost.text();
      setPost(textPost);
    };

    fetchBlog();
  }, [blogId]);

  console.log(post);

  return (
    <Paper sx={{ p: 3, my: 2, background: "rgb(0, 0, 0, 0.01)" }}>
      <Markdown>{post}</Markdown>
    </Paper>
  );
}
