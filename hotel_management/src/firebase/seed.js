// src/firebase/seed.js
import { db } from '../../firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

const roomsData = [
  {
    "id": "room1",
    "name": "Deluxe Suite",
    "type": "suite",
    "price": 299,
    "capacity": 3,
    "available": true,
    "amenities": ["WiFi", "TV", "AC", "Mini Bar", "Sea View", "King Bed", "Bathtub", "Room Service"],
    "description": "Luxurious suite with breathtaking ocean view, king-sized bed, and marble bathroom",
    "imageUrl": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    "size": "650 sq ft",
    "view": "Ocean View",
    "bedType": "King Bed",
    "rating": 4.8
  },
  {
    "id": "room2",
    "name": "Executive Room",
    "type": "executive",
    "price": 199,
    "capacity": 2,
    "available": true,
    "amenities": ["WiFi", "TV", "AC", "Work Desk", "Coffee Maker", "Safe", "Iron"],
    "description": "Comfortable room for business travelers with dedicated workspace and premium amenities",
    "imageUrl": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
    "size": "400 sq ft",
    "view": "City View",
    "bedType": "Queen Bed",
    "rating": 4.5
  },
  {
    "id": "room3",
    "name": "Family Suite",
    "type": "family",
    "price": 399,
    "capacity": 5,
    "available": true,
    "amenities": ["WiFi", "TV", "AC", "Kitchenette", "Bunk Beds", "Play Area", "Connecting Rooms"],
    "description": "Spacious suite designed for families, featuring separate kids' area and child-friendly amenities",
    "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    "size": "900 sq ft",
    "view": "Garden View",
    "bedType": "1 King + 2 Twins",
    "rating": 4.9
  },
  {
    "id": "room4",
    "name": "Standard Double",
    "type": "standard",
    "price": 129,
    "capacity": 2,
    "available": true,
    "amenities": ["WiFi", "TV", "AC", "Coffee Maker", "Hair Dryer"],
    "description": "Cozy and practical room perfect for short stays or budget-conscious travelers",
    "imageUrl": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
    "size": "300 sq ft",
    "view": "City View",
    "bedType": "Double Bed",
    "rating": 4.2
  },
  {
    "id": "room5",
    "name": "Presidential Suite",
    "type": "suite",
    "price": 899,
    "capacity": 4,
    "available": true,
    "amenities": ["WiFi", "TV", "AC", "Private Pool", "Butler Service", "Kitchen", "Dining Room", "Private Terrace"],
    "description": "The ultimate luxury experience with private pool, dedicated butler, and panoramic city views",
    "imageUrl": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    "size": "2500 sq ft",
    "view": "Panoramic City View",
    "bedType": "2 King Beds",
    "rating": 5.0
  }
];

export const seedRooms = async () => {
  try {
    const roomsRef = collection(db, 'rooms');
    const snapshot = await getDocs(roomsRef);
    
    if (snapshot.empty) {
      console.log('Seeding rooms collection...');
      for (const room of roomsData) {
        const { id, ...data } = room;
        await setDoc(doc(db, 'rooms', id), data);
      }
      console.log('Seeding complete!');
    } else {
      console.log('Rooms collection already has data. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
