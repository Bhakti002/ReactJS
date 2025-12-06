export default function Delete({ students, onDelete }) {
  const handleDelete = (id, name) => {
    const confirm = window.confirm('Are you sure you want to delete ' + name + '?')
    if (confirm) {
      onDelete(id)
    }
  }

  return (
    <div className="delete-container">
      <h2>Delete Student</h2>
      
      {students.length === 0 ? (
        <p className="no-data">No students found</p>
      ) : (
        <div className="student-list">
          {students.map((student) => (
            <div key={student.id} className="student-item">
              <div>ID: {student.id} | {student.name} - {student.rollNo}</div>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(student.id, student.name)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
