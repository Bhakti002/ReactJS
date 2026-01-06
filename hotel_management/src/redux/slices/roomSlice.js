// src/redux/slices/roomSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data as fallback
const mockRooms = [
  {
    id: "room1",
    name: "Deluxe Suite",
    type: "suite",
    price: 299,
    capacity: 3,
    available: true,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Sea View"],
    description: "Luxurious suite with ocean view",
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    rating: 4.8,
    size: "650 sq ft"
  }
];

// Fetch rooms from json-server
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching rooms from db.json...');
      const response = await fetch('http://localhost:5000/rooms');
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('json-server error, using mock data:', error.message);
      return mockRooms;
    }
  }
);

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    loading: false,
    error: null,
    filters: {
      type: 'all',
      available: true,
      minPrice: '',
      maxPrice: '',
      capacity: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        type: 'all',
        available: true,
        minPrice: '',
        maxPrice: '',
        capacity: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.rooms = mockRooms;
      });
  }
});

export const { setFilters, clearFilters } = roomSlice.actions;
export default roomSlice.reducer;
