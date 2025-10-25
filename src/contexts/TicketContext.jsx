import { createContext, useContext, useState, useEffect } from 'react';

const TicketContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const storedTickets = localStorage.getItem('ticketapp_tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
    setLoading(false);
  }, []);

  // Save tickets to localStorage whenever tickets change
  useEffect(() => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Create a new ticket
  const createTicket = (ticketData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validation
          if (!ticketData.title?.trim()) {
            reject(new Error('Title is required'));
            return;
          }

          if (!ticketData.status || !['open', 'in_progress', 'closed'].includes(ticketData.status)) {
            reject(new Error('Status must be one of: open, in_progress, or closed'));
            return;
          }

          const newTicket = {
            id: Date.now(), // Simple ID generation
            title: ticketData.title.trim(),
            description: ticketData.description?.trim() || '',
            status: ticketData.status,
            priority: ticketData.priority || 'medium',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          setTickets(prev => [newTicket, ...prev]);
          resolve(newTicket);
        } catch (error) {
          reject(new Error('Failed to create ticket'));
        }
      }, 500); // Simulate API delay
    });
  };

  // Update an existing ticket
  const updateTicket = (id, ticketData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validation
          if (!ticketData.title?.trim()) {
            reject(new Error('Title is required'));
            return;
          }

          if (!ticketData.status || !['open', 'in_progress', 'closed'].includes(ticketData.status)) {
            reject(new Error('Status must be one of: open, in_progress, or closed'));
            return;
          }

          setTickets(prev => prev.map(ticket => 
            ticket.id === id 
              ? { 
                  ...ticket, 
                  title: ticketData.title.trim(),
                  description: ticketData.description?.trim() || '',
                  status: ticketData.status,
                  priority: ticketData.priority || 'medium',
                  updatedAt: new Date().toISOString()
                }
              : ticket
          ));
          resolve();
        } catch (error) {
          reject(new Error('Failed to update ticket'));
        }
      }, 500);
    });
  };

  // Delete a ticket
  const deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          setTickets(prev => prev.filter(ticket => ticket.id !== id));
          resolve();
        } catch (error) {
          reject(new Error('Failed to delete ticket'));
        }
      }, 500);
    });
  };

  // Get ticket statistics for dashboard
  const getTicketStats = () => {
    const total = tickets.length;
    const open = tickets.filter(ticket => ticket.status === 'open').length;
    const inProgress = tickets.filter(ticket => ticket.status === 'in_progress').length;
    const closed = tickets.filter(ticket => ticket.status === 'closed').length;

    return { total, open, inProgress, closed };
  };

  const value = {
    tickets,
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketStats,
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;