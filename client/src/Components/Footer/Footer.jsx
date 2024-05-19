import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--var-color)",
        color: "white",
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box>
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EcoConnect
          </Typography>
              <Typography >
                Connecting people for a sustainable future.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{textAlign:"center"}}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Useful Links
              </Typography>
              <Link href="/" color="inherit">
                Home
              </Link>
              <br />
              <Link href="/about" color="inherit">
                About
              </Link>
              <br />
              <Link href="/contact" color="inherit">
                Contact
              </Link>
              <br />
              <Link href="/privacy" color="inherit">
                Privacy Policy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{textAlign:"center"}}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Link href="https://facebook.com" color="inherit">
                Facebook
              </Link>
              <br />
              <Link href="https://twitter.com" color="inherit">
                Twitter
              </Link>
              <br />
              <Link href="https://instagram.com" color="inherit">
                Instagram
              </Link>
              <br />
              <Link href="https://linkedin.com" color="inherit">
                LinkedIn
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={5} pb={5}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} EcoConnect. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
