import { useState } from 'react'

export default function Update({ students, onUpdate }) {
  const [selectId, setSelectId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [grade, setGrade] = useState('')

  const handleSelect = (student) => {
    setSelectId(student.id)
    setName(student.name)
    setEmail(student.email)
    setRollNo(student.rollNo)
    setGrade(student.grade)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (name === '' || email === '' || rollNo === '' || grade === '') {
      alert('Please fill all fields')
      return
    }

    const updatedData = {
      name: name,
      email: email,
      rollNo: rollNo,
      grade: grade
    }

    onUpdate(selectId, updatedData)
    
    setSelectId(null)
    setName('')
    setEmail('')
    setRollNo('')
    setGrade('')
  }

  const handleCancel = () => {
    setSelectId(null)
    setName('')
    setEmail('')
    setRollNo('')
    setGrade('')
  }

  return (
    <div className="update-container">
      <h2>Update Student</h2>
      
      {selectId === null ? (
        <div>
          {students.length === 0 ? (
            <p className="no-data">No students found</p>
          ) : (
            <div className="student-list">
              {students.map((student) => (
                <div key={student.id} className="student-item">
                  <div>ID: {student.id} | {student.name} - {student.rollNo}</div>
                  <button onClick={() => handleSelect(student)}>Edit</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Grade</label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="submit">Update Student</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  )
}
