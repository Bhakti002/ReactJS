export default function Read({ students }) {
  return (
    <div className="read-container">
      <h2>View All Students</h2>
      
      {students.length === 0 ? (
        <p className="no-data">No students found</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll Number</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.rollNo}</td>
                <td>{student.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
