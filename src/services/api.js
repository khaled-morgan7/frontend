const API_BASE_URL = 'http://localhost:5555';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

export const api = {
  // User Routes
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        NAME: userData.name,
        EMAIL: userData.email,
        PASSWORD: userData.password,
        ROLE: 'user' // Default role
      }),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        EMAIL: credentials.email,
        PASSWORD: credentials.password
      }),
    });
    return handleResponse(response);
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  getUserByEmail: async (email) => {
    const response = await fetch(`${API_BASE_URL}/user/${email}`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  updateProfile: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        NAME: userData.name,
        EMAIL: userData.email,
        PASSWORD: userData.password
      }),
    });
    return handleResponse(response);
  },

  // Ticket Routes
  getAllTickets: async () => {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  searchTickets: async (searchParams) => {
    const queryParams = new URLSearchParams({
      ORIGIN: searchParams.origin,
      DESTINATION: searchParams.destination,
      DATE: searchParams.date
    });
    const response = await fetch(`${API_BASE_URL}/ticket/search?${queryParams}`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  addTicket: async (ticketData) => {
    const response = await fetch(`${API_BASE_URL}/tickets/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ORIGIN: ticketData.origin,
        DESTINATION: ticketData.destination,
        DATE: ticketData.date,
        DEPARTURE_TIME: ticketData.departureTime,
        ARRIVAL_TIME: ticketData.arrivalTime,
        PRICE: ticketData.price,
        QUANTITY: ticketData.quantity
      }),
    });
    return handleResponse(response);
  },

  getTicketById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tickets/search/${id}`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  updateTicketQuantity: async (id, quantity) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}/quantity`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ QUANTITY: quantity }),
    });
    return handleResponse(response);
  },

  deleteTicket: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Booking Routes
  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        USER_ID: bookingData.userId,
        TICKET_ID: bookingData.ticketId,
        BOOKING_DATE: new Date().toISOString(),
        STATUS: 'confirmed',
        QUANTITY: bookingData.quantity || 1
      }),
    });
    return handleResponse(response);
  },

  getUserBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  getBookingById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  cancelBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Feedback Routes
  submitFeedback: async (feedbackData) => {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        USER_ID: feedbackData.userId,
        BOOKING_ID: feedbackData.bookingId,
        RATING: feedbackData.rating,
        COMMENT: feedbackData.comment,
        FEEDBACK_DATE: new Date().toISOString()
      }),
    });
    return handleResponse(response);
  },

  getAllFeedback: async () => {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  deleteFeedback: async (id) => {
    const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },
};
