import { useState, useEffect } from 'react'
import { auth, googleProvider, db } from './firebase.js'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { addRandomStudents } from './addStudents.js'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({ name: '', age: '', grade: '', email: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (!currentUser) {
        setStudents([])
      }
    })
    return () => unsubscribeAuth()
  }, [])

  useEffect(() => {
    if (!user) return

    const studentsCollection = collection(db, 'students')
    const unsubscribeSnapshot = onSnapshot(studentsCollection, (snapshot) => {
      const studentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setStudents(studentList)
    }, (error) => {
      console.error("Snapshot listener error:", error)
    })

    return () => unsubscribeSnapshot()
  }, [user])

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("Error signing in", error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out", error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.age || !formData.grade || !formData.email) return

    try {
      if (editingId) {
        const studentDoc = doc(db, 'students', editingId)
        await updateDoc(studentDoc, formData)
        setEditingId(null)
      } else {
        await addDoc(collection(db, 'students'), formData)
      }
      setFormData({ name: '', age: '', grade: '', email: '' })
    } catch (error) {
      console.error("Error saving student", error)
    }
  }

  const handleEdit = (student) => {
    setFormData({ name: student.name, age: student.age, grade: student.grade, email: student.email })
    setEditingId(student.id)
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id))
    } catch (error) {
      console.error("Error deleting student", error)
    }
  }

  return (
    <div className="App">
      <h1>Student Management System</h1>
      {user ? (
        <div className="container">
          <div className="user-profile">
            <p>Welcome, {user.displayName}</p>
            <img src={user.photoURL} alt={user.displayName} className="avatar" />
            <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
          </div>

          <div className="actions">
            <button onClick={addRandomStudents} className="random-btn">Add Random Students</button>
          </div>

          <form onSubmit={handleSubmit} className="student-form">
            <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
            <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleInputChange} required />
            <input name="grade" placeholder="Grade" value={formData.grade} onChange={handleInputChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <button type="submit">{editingId ? 'Update Student' : 'Add Student'}</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', age: '', grade: '', email: '' }) }}>Cancel</button>}
          </form>

          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.grade}</td>
                  <td>{student.email}</td>
                  <td>
                    <button onClick={() => handleEdit(student)}>Edit</button>
                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="login-container">
          <button onClick={handleSignIn} className="signin-btn">Sign In with Google</button>
        </div>
      )}
    </div>
  )
}

export default App
