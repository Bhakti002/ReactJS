// src/firebase/userData.js

// 1. Sync User Profile (Save/Update user data in db.json 'users' collection)
export const syncUserProfile = async (user) => {
  if (!user) return;
  
  try {
    const userData = {
      id: user.uid, // json-server uses 'id'
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Guest',
      photoURL: user.photoURL || '',
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Check if user exists
    const checkRes = await fetch(`http://localhost:5000/users/${user.uid}`);
    
    if (checkRes.ok) {
      // Update
      await fetch(`http://localhost:5000/users/${user.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
    } else {
      // Create
      await fetch(`http://localhost:5000/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error syncing user profile to json-server:', error);
    return { success: false, error: error.message };
  }
};

// These functions were primarily for Firestore.
// Since we've moved logic to Redux slices using fetch, 
// these can be simplified or deprecated.

export const saveReservation = async (userData, roomData) => {
  // Implementation moved to reservationSlice.js
  console.warn('saveReservation in userData.js is deprecated. Use reservationSlice instead.');
};

export const getUserReservations = async (userId) => {
  // Implementation moved to reservationSlice.js
};
