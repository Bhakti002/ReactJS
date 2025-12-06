import { useState, useEffect } from 'react'
import './App.css'
import Create from './create'
import Read from './read'
import Update from './update'
import Delete from './delete'

const initialStudents = [
  { id: 1, name: 'Raj Kumar', email: 'raj@example.com', rollNo: '001', grade: 'A' },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', rollNo: '002', grade: 'B' },
  { id: 3, name: 'Amit Patel', email: 'amit@example.com', rollNo: '003', grade: 'A' }
]

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students')
    return saved ? JSON.parse(saved) : initialStudents
  })
  const [activeTab, setActiveTab] = useState('read')

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const handleAdd = (newStudent) => {
    const maxId = students.length > 0 ? Math.max(...students.map(s => s.id)) : 0
    const studentWithId = { ...newStudent, id: maxId + 1 }
    setStudents([...students, studentWithId])
    alert('Student added!')
  }

  const handleUpdate = (id, updatedData) => {
    const newStudents = students.map((student) => {
      if (student.id === id) {
        return {
          id: student.id,
          name: updatedData.name,
          email: updatedData.email,
          rollNo: updatedData.rollNo,
          grade: updatedData.grade
        }
      }
      return student
    })
    setStudents(newStudents)
    alert('Student updated!')
  }

  const handleDelete = (id) => {
    const filtered = students.filter((student) => student.id !== id)
    const renumbered = filtered.map((student, index) => ({
      ...student,
      id: index + 1
    }))
    setStudents(renumbered)
    alert('Student deleted!')
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>Student Records</h1>
      </div>

      <div className="navbar">
        <button 
          className={activeTab === 'create' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('create')}
        >
          Add
        </button>
        <button 
          className={activeTab === 'read' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('read')}
        >
          View
        </button>
        <button 
          className={activeTab === 'update' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('update')}
        >
          Update
        </button>
        <button 
          className={activeTab === 'delete' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('delete')}
        >
          Delete
        </button>
      </div>

      <div className="content">
        {activeTab === 'create' && <Create onAdd={handleAdd} />}
        {activeTab === 'read' && <Read students={students} />}
        {activeTab === 'update' && <Update students={students} onUpdate={handleUpdate} />}
        {activeTab === 'delete' && <Delete students={students} onDelete={handleDelete} />}
      </div>
    </div>
  )
}

export default App
