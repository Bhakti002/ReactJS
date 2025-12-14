import { NavLink } from "react-router-dom";


function Navbar({ setCategory, setSearch, setSort }) {
	return (
		<nav className="navbar">
			<h1 className="logo">Clothy</h1>

			<ul className="nav-links">
				<li onClick={() => setCategory("all")}>All</li>
				<li onClick={() => setCategory("men")}>Men</li>
				<li onClick={() => setCategory("women")}>Women</li>
				<li onClick={() => setCategory("kids")}>Kids</li>
			</ul>

			<div className="nav-actions">
				<input
					type="text"
					placeholder="Search..."
					onChange={(e) => setSearch(e.target.value)}
				/>

				<select onChange={(e) => setSort(e.target.value)}>
					<option value="">Sort</option>
					<option value="low">Low → High</option>
					<option value="high">High → Low</option>
				</select>

				<NavLink to="/add" className="add-product-btn" aria-label="Add product">
					➕ Add
				</NavLink>
			</div>
		</nav>
	);
}


export default Navbar;