import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';
import { useToast } from '../contexts/ToastContext';
import TicketForm from '../components/TicketForm';

const TicketManagement = () => {
  const { user, logout } = useAuth();
  const { tickets, deleteTicket, loading } = useTickets();
  const { showToast } = useToast();
  
  const [openForm, setOpenForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, ticketId: null, ticketTitle: '' });

  const handleCreateTicket = () => {
    setEditingTicket(null);
    setOpenForm(true);
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setOpenForm(true);
  };

  const handleDeleteClick = (ticket) => {
    setDeleteDialog({
      open: true,
      ticketId: ticket.id,
      ticketTitle: ticket.title,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTicket(deleteDialog.ticketId);
      showToast('Ticket deleted successfully', 'success');
      setDeleteDialog({ open: false, ticketId: null, ticketTitle: '' });
    } catch (error) {
      showToast('Failed to delete ticket', 'error');
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setEditingTicket(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'success';
      case 'in_progress': return 'warning';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'open': return 'Open';
      case 'in_progress': return 'In Progress';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Ticket Management
        </Typography>
        <Box>
          <Typography variant="body1" component="span" sx={{ mr: 2 }}>
            {user?.name}
          </Typography>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Action Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" color="text.secondary">
          {loading ? 'Loading tickets...' : `${tickets.length} ${tickets.length === 1 ? 'Ticket' : 'Tickets'}`}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateTicket}
          disabled={loading}
        >
          Create Ticket
        </Button>
      </Box>

      {/* Tickets Grid */}
      <Grid container spacing={3}>
        {loading ? (
          // Loading State
          <Grid item xs={12}>
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              minHeight="200px"
              flexDirection="column"
              gap={2}
            >
              <CircularProgress />
              <Typography variant="body1" color="text.secondary">
                Loading tickets...
              </Typography>
            </Box>
          </Grid>
        ) : tickets.length === 0 ? (
          // Empty State
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', py: 6 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No tickets yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Create your first ticket to get started
                </Typography>
                <Button variant="contained" onClick={handleCreateTicket}>
                  Create Ticket
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          // Tickets List
          tickets.map((ticket) => (
            <Grid item xs={12} md={6} lg={4} key={ticket.id}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Ticket Header */}
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="h3" sx={{ 
                      fontWeight: 600,
                      flex: 1,
                      mr: 1 
                    }}>
                      {ticket.title}
                    </Typography>
                    <Box display="flex" gap={0.5}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditTicket(ticket)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteClick(ticket)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Ticket Description */}
                  {ticket.description && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {ticket.description}
                    </Typography>
                  )}

                  {/* Status and Priority Chips */}
                  <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                    <Chip 
                      label={getStatusLabel(ticket.status)}
                      color={getStatusColor(ticket.status)}
                      size="small"
                    />
                    <Chip 
                      label={ticket.priority}
                      color={getPriorityColor(ticket.priority)}
                      variant="outlined"
                      size="small"
                    />
                  </Box>

                  {/* Timestamps */}
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Created: {new Date(ticket.createdAt).toLocaleDateString()}
                    </Typography>
                    {ticket.updatedAt !== ticket.createdAt && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Ticket Form Dialog */}
      <Dialog 
        open={openForm} 
        onClose={handleFormClose}
        maxWidth="sm"
        fullWidth
      >
        <TicketForm
          ticket={editingTicket}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            showToast(
              editingTicket ? 'Ticket updated successfully' : 'Ticket created successfully',
              'success'
            );
          }}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, ticketId: null, ticketTitle: '' })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the ticket "{deleteDialog.ticketTitle}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, ticketId: null, ticketTitle: '' })}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TicketManagement;