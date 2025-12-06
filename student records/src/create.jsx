import { useState } from 'react'

export default function Create({ onAdd }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [grade, setGrade] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (name === '' || email === '' || rollNo === '' || grade === '') {
      alert('Please fill all fields')
      return
    }

    const newStudent = {
      name: name,
      email: email,
      rollNo: rollNo,
      grade: grade
    }

    onAdd(newStudent)
    
    setName('')
    setEmail('')
    setRollNo('')
    setGrade('')
  }

  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Roll Number</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter roll number"
          />
        </div>

        <div className="form-group">
          <label>Grade</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Enter grade"
          />
        </div>

        <button type="submit">Add Student</button>
      </form>
    </div>
  )
}
