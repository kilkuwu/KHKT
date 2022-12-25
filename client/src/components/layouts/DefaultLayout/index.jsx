import { Container } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function DefaultLayout({ children, showLogInButton }) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header showLogInButton={showLogInButton} />
      <Navbar />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </main>
      <Footer />
    </Container>
  );
}
