import { Container, Typography, Box } from "@mui/material";

const TicketManagement = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Ticket Management
      </Typography>
      <Box>
        {/* Ticket CRUD interface will go here */}
        <Typography>Ticket management system coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default TicketManagement;
