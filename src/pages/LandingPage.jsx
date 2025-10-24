import {
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Hero Section with Wavy Background */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Wavy Background - Improved */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30%",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              transform: "scaleX(1.5)",
            }}
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </Box>

        {/* Decorative Circle */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 2, py: 8 }}
        >
          <Box
            sx={{
              textAlign: "center",
              color: "white",
              maxWidth: 800,
              mx: "auto",
              my: 8,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              TicketFlow
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
            >
              Streamline your support ticket management with our powerful,
              intuitive platform. Resolve issues faster and keep your customers
              happy.
            </Typography>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                to="/auth/login"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/auth/signup"
                variant="outlined"
                color="inherit"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderWidth: 2,
                  "&:hover": { borderWidth: 2 },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose TicketFlow?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Feature Box 1 */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 350,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    color: "white",
                  }}
                >
                  <Typography variant="h6">🚀</Typography>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Fast & Efficient
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage tickets quickly with our streamlined interface designed
                  for maximum productivity.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature Box 2 */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 350,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "secondary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    color: "white",
                  }}
                >
                  <Typography variant="h6">🔒</Typography>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Secure & Reliable
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your data is protected with enterprise-grade security and
                  reliable backup systems.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature Box 3 */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 350,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "success.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    color: "white",
                  }}
                >
                  <Typography variant="h6">📊</Typography>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Smart Analytics
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get insights with detailed analytics and reporting to improve
                  your support process.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "grey.100",
          py: 4,
          mt: 8,
          borderTop: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" textAlign="center">
            © 2024 TicketFlow. All rights reserved. | Built with React &
            Material-UI
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
