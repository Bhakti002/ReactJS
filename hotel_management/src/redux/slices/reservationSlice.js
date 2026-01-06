// src/redux/slices/reservationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:5000';

// Fetch reservations from json-server
export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/reservations`);
      if (!response.ok) throw new Error('Failed to fetch reservations');
      let data = await response.json();
      
      if (userId) {
        data = data.filter(res => res.userId === userId);
      }
      
      // Fetch room details for each reservation
      const reservationsWithRooms = await Promise.all(data.map(async (res) => {
        try {
          const roomRes = await fetch(`${API_URL}/rooms/${res.roomId}`);
          if (roomRes.ok) {
            res.roomDetails = await roomRes.json();
          }
        } catch (e) {
          console.error('Error fetching room details:', e);
        }
        return res;
      }));
      
      return reservationsWithRooms;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Make reservation in json-server
export const makeReservation = createAsyncThunk(
  'reservations/makeReservation',
  async (reservationData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.user) throw new Error('User must be authenticated');
      
      const newReservation = {
        ...reservationData,
        userId: auth.user.uid,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };
      
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation)
      });
      
      if (!response.ok) throw new Error('Failed to save reservation');
      const savedRes = await response.json();
      
      // Update room availability
      await fetch(`${API_URL}/rooms/${reservationData.roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: false })
      });
      
      return savedRes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Cancel reservation in json-server
export const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async ({ reservationId, roomId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      });
      
      if (!response.ok) throw new Error('Failed to cancel reservation');
      
      // Update room availability back to true
      await fetch(`${API_URL}/rooms/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: true })
      });
      
      return { id: reservationId, status: 'cancelled' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete reservation from json-server
export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async ({ reservationId, roomId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete reservation');
      
      // Restore room availability if necessary
      if (roomId) {
        await fetch(`${API_URL}/rooms/${roomId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ available: true })
        });
      }
      
      return reservationId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    loading: false,
    error: null
  },
  reducers: {
    clearReservationError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(makeReservation.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        const index = state.reservations.findIndex(res => res.id === action.payload.id);
        if (index !== -1) state.reservations[index].status = 'cancelled';
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(res => res.id !== action.payload);
      });
  }
});

export const { clearReservationError } = reservationSlice.actions;
export default reservationSlice.reducer;
