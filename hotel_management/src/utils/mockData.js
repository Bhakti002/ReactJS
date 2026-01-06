// src/utils/mockData.js
export const mockRooms = [
  {
    id: "1",
    name: "Deluxe Suite",
    type: "suite",
    price: 299,
    capacity: 3,
    available: true,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Sea View"],
    description: "Luxurious suite with ocean view",
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"
  },
  {
    id: "2",
    name: "Executive Room",
    type: "executive",
    price: 199,
    capacity: 2,
    available: true,
    amenities: ["WiFi", "TV", "AC", "Work Desk"],
    description: "Comfortable room for business travelers",
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
  }
];

// Update roomSlice to use mock data
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      // Try Firebase first
      const roomsRef = collection(db, 'rooms');
      const querySnapshot = await getDocs(roomsRef);
      
      const rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push({ id: doc.id, ...doc.data() });
      });
      
      return rooms;
    } catch (error) {
      console.log('Using mock data due to Firebase error:', error.message);
      // Return mock data if Firebase fails
      return mockRooms;
    }
  }
);