import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

const students = [
  { name: "Alice Johnson", age: 20, grade: "A", email: "alice@example.com" },
  { name: "Bob Smith", age: 22, grade: "B", email: "bob@example.com" },
  { name: "Charlie Brown", age: 21, grade: "C", email: "charlie@example.com" },
  { name: "David Wilson", age: 23, grade: "A", email: "david@example.com" },
  { name: "Eva Davis", age: 19, grade: "B", email: "eva@example.com" },
  { name: "Frank Miller", age: 24, grade: "A", email: "frank@example.com" },
  { name: "Grace Lee", age: 20, grade: "B", email: "grace@example.com" },
  { name: "Henry Chen", age: 22, grade: "C", email: "henry@example.com" },
  { name: "Ivy Taylor", age: 21, grade: "A", email: "ivy@example.com" },
  { name: "Jack White", age: 23, grade: "B", email: "jack@example.com" },
];

export const addRandomStudents = async () => {
  try {
    const studentsCollection = collection(db, "students");
    for (const student of students) {
      await addDoc(studentsCollection, student);
    }
    alert("Random students added successfully!");
  } catch (error) {
    console.error("Error adding students: ", error);
    alert("Error adding students: " + error.message);
  }
};
