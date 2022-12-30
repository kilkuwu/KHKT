import * as React from "react";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MainFeaturedPost from "../components/Blog/MainFeaturedPost";
import FeaturedPost from "../components/Blog/FeaturedPost";
import Main from "../components/Blog/Main";
import Sidebar from "../components/Blog/Sidebar";
import post1 from "../blogs/blog-post.1.md";
import post2 from "../blogs/blog-post.2.md";
import post3 from "../blogs/blog-post.3.md";

const mainFeaturedPost = {
  title: "Vòng đeo tay định vị, theo dõi sức khỏe phục vụ cho y tế",
  description:
    "Nếu ý tưởng tạo ra “Vòng đeo tay định vị, theo dõi sức khỏe cho đối tượng cách ly và bệnh nhân mắc COVID-19” đảm bảo được các yêu cầu thiết yếu về kĩ thuật và tiêu chuẩn thì thiết bị này sẽ một phần nào đó giúp các cơ quan chức năng dễ dàng và thuận lợi trong việc kiểm soát các đối tượng cách ly và bệnh nhân COVID-19.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Đọc tiếp...",
};

const featuredPosts = [
  {
    title: "Lý do chọn đề tài",
    date: "30 tháng 12",
    description:
      "Đề tài y tế đã, đang và luôn là vấn đề được bàn tán rất nhiều trong thời gian vừa qua. Chúng em, với mong muốn giúp các y bác sĩ đạt hiệu quả cao hơn trong việc quan sát và chăm sóc bệnh nhân, chúng em đã tạo ra sản phẩm vòng tay thông minh này.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Blog() {
  return (
    <>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main title="From the firehose" posts={posts} />
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
          social={sidebar.social}
        />
      </Grid>
    </>
  );
}
