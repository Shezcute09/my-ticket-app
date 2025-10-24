import { Container, Typography, Box } from "@mui/material";

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box>
        {/* Login form will go here */}
        <Typography>Login form coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default Login;
