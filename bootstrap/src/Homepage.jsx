import React from "react";

function Homepage() {
  return (
    <div className="section1">

      {/* Background Video */}
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="/video-2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mask Overlay */}
      <div className="video-mask"></div>

      {/* Top Navigation */}
      <nav className="nav1 d-flex justify-content-between align-items-center px-4 py-2">
        <p className="logo">LeadPage</p>
        <div className="icons">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </nav>

      {/* Main Navigation */}
      <nav className="nav2 navbar navbar-expand-lg">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent">
              
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Services</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Portfolio</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Team</a>
              </li>

              {/* Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Dropdown 1</a></li>
                  <li><a className="dropdown-item" href="#">Dropdown 2</a></li>
                  <li><a className="dropdown-item" href="#">Dropdown 3</a></li>
                  <li><a className="dropdown-item" href="#">Dropdown 4</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section Content */}
      <div className="hero-content text-center">
        <h1 className="anim">Transform Your Vision Into Reality</h1>
        <p className="anim">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint accusamus id tempora numquam laudantium iusto eius quam corrupti quos repellat!
        </p>

        <div className="buttons">
          <button className="btn-primary anim">Get Started</button>
          <button className="btn-outline anim">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
