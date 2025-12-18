export default function DataTable({ sortedData, requestSort, sortConfig, handleEdit, handleDelete }) {
  return (
    <div className="data-table card">
      <table className="table">
        <thead>
          <tr>
            {["name", "age", "city"].map((key) => (
              <th
                key={key}
                onClick={() => requestSort(key)}
                className="th"
              >
                {key.toUpperCase()}{" "}
                {sortConfig.key === key && (sortConfig.direction === "asc" ? "⬆️" : "⬇️")}
              </th>
            ))}
            <th className="th">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id} className="tr">
              <td className="td">{item.name}</td>
              <td className="td">{item.age}</td>
              <td className="td">{item.city}</td>
              <td className="td actions">
                <button onClick={() => handleEdit(item)} className="btn-edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {sortedData.length === 0 && (
            <tr>
              <td colSpan="4" className="no-data">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
