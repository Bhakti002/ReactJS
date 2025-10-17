
function Navbar({cartValue}){

    return(
        <div className="navbar">
            <h1>meesho</h1>
            <button>Cart ({cartValue}) </button>
        </div>
    )
}

export default Navbar