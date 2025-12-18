import { useState, useMemo } from "react";
import "../App.css";
import Form from "./Form";
import Controls from "./Controls";
import DataTable from "./DataTable";

export default function DataTableCRUD() {
  const [data, setData] = useState([
    { id: 1, name: "Bhakti", age: 20, city: "Gandhinagar" },
    { id: 2, name: "Binal", age: 25, city: "Ahmedabad" },
     { id: 3, name: "Meghna", age: 19, city: "Gandhinagar" },
  ]);

  const [form, setForm] = useState({ id: null, name: "", age: "", city: "" });
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id === null) {
      const newItem = { ...form, id: Date.now() };
      setData([...data, newItem]);
    } else {
      setData(data.map((item) => (item.id === form.id ? form : item)));
    }

    setForm({ id: null, name: "", age: "", city: "" });
  };

  const handleEdit = (item) => {
    setForm(item);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const cityOptions = useMemo(() => {
    const setC = new Set(data.map((d) => d.city));
    return ["", ...Array.from(setC)];
  }, [data]);

  const visibleData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.name.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.city.toString().toLowerCase().includes(search.toLowerCase());
      const matchesCity = filterCity ? item.city === filterCity : true;
      return matchesSearch && matchesCity;
    });
  }, [data, search, filterCity]);

  const sortedData = useMemo(() => {
    let sortable = [...visibleData];

    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const av = a[sortConfig.key];
        const bv = b[sortConfig.key];
        if (av < bv) return sortConfig.direction === "asc" ? -1 : 1;
        if (av > bv) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [visibleData, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const clearFilter = () => setFilterCity("");

  return (
    <div className="page-wrap p-10 max-w-6xl mx-auto">
      <h1 className="page-title">Redux</h1>

      <Form form={form} setForm={setForm} handleSubmit={handleSubmit} />

      <Controls
        search={search}
        setSearch={setSearch}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        showSort={showSort}
        setShowSort={setShowSort}
        filterCity={filterCity}
        setFilterCity={setFilterCity}
        clearFilter={clearFilter}
        cityOptions={cityOptions}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />

      <DataTable
        sortedData={sortedData}
        requestSort={requestSort}
        sortConfig={sortConfig}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
