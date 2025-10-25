import { Container, Typography, Box, Button, Grid, Card, CardContent, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { getTicketStats } = useTickets();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = getTicketStats();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header - Responsive */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems={isMobile ? "flex-start" : "center"}
        flexDirection={isMobile ? "column" : "row"}
        gap={isMobile ? 2 : 0}
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body1" component="span">
            Welcome, <strong>{user?.name}</strong>!
          </Typography>
          <Button variant="outlined" onClick={handleLogout} size={isMobile ? "small" : "medium"}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Stats Cards - Responsive Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}>
          <Card 
            sx={{ 
              borderRadius: 2, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              height: '100%'
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h3" color="primary" gutterBottom>
                {stats.total}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Total Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card 
            sx={{ 
              borderRadius: 2, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              height: '100%'
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h3" color="success.main" gutterBottom>
                {stats.open}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Open Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card 
            sx={{ 
              borderRadius: 2, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              height: '100%'
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h3" color="warning.main" gutterBottom>
                {stats.inProgress}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card 
            sx={{ 
              borderRadius: 2, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              height: '100%'
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h3" color="text.secondary" gutterBottom>
                {stats.closed}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box textAlign="center">
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/tickets')}
          sx={{ minWidth: isMobile ? '100%' : 'auto' }}
        >
          Go to Ticket Management
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;