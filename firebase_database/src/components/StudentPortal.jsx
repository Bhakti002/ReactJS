import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const StudentPortal = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "students"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentData = [];
      querySnapshot.forEach((doc) => {
        studentData.push({ ...doc.data(), id: doc.id });
      });
      setStudents(studentData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && rollNo && course) {
      try {
        if (editId) {
          await updateDoc(doc(db, "students", editId), {
            name,
            rollNo,
            course,
          });
          setEditId(null);
        } else {
          await addDoc(collection(db, "students"), {
            name,
            rollNo,
            course,
            createdAt: serverTimestamp(),
          });
        }
        setName("");
        setRollNo("");
        setCourse("");
      } catch (error) {
        console.error("Error saving document: ", error);
      }
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setRollNo(student.rollNo);
    setCourse(student.course);
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteDoc(doc(db, "students", id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setName("");
    setRollNo("");
    setCourse("");
  };

  return (
    <div className="student-portal">
      <h2>Student Entry Portal</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">{editId ? "Update Student" : "Add Student"}</button>
          {editId && <button type="button" onClick={handleCancel} style={{ background: "#666" }}>Cancel</button>}
        </div>
      </form>

      <div className="student-list">
        <h3>All Student Entries</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.course}</td>
                <td>
                  <button onClick={() => handleEdit(student)} className="action-btn edit">Edit</button>
                  <button onClick={() => handleDelete(student.id)} className="action-btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentPortal;
