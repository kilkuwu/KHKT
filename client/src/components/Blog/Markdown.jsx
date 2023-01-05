import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function MarkdownListItem(props) {
  return <Box component="li" sx={{ mt: 1, typography: "body1" }} {...props} />;
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h2",
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: "h3" },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: "h4" },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h5",
      },
    },
    h5: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h6",
      },
    },
    h6: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "subtitle1",
      },
    },
    p: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h6",
        fontWeight: "normal",
        paragraph: true,
      },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
  },
};

export default function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />;
}
