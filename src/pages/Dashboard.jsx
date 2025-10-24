import { Container, Typography, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Box>
        {/* Dashboard content will go here */}
        <Typography>Dashboard statistics coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
