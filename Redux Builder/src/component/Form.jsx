export default function Form({ form, setForm, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <input
        type="text"
        placeholder="Enter Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="input"
        required
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
        className="input"
        required
      />

      <input
        type="text"
        placeholder="Enter City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        className="input"
        required
      />

      <button type="submit" className="btn-primary">
        {form.id === null ? "Add" : "Update"}
      </button>
    </form>
  );
}
