// src/pages/Dashboard.jsx - Updated
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Box>
          <Typography variant="body1" component="span" sx={{ mr: 2 }}>
            Welcome, {user?.name}!
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Typography variant="h3" color="primary" gutterBottom>
                0
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Total Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Typography variant="h3" color="success.main" gutterBottom>
                0
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Open Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Typography variant="h3" color="text.secondary" gutterBottom>
                0
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Resolved Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box textAlign="center">
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/tickets")}
        >
          Go to Ticket Management
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
