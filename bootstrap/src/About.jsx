import "./App.css";
import client1 from "/image/clients-1.webp";
import client2 from "/image/clients-2.webp";
import client3 from "/image/clients-3.webp";
import client4 from "/image/clients-4.webp";
import client5 from "/image/clients-5.webp";
import client6 from "/image/clients-6.webp";

function About() {

    return (
        <div className="section2">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

            <div className="container"  >
                <p className="anim">ABOUT</p>
            </div>
            <div className="about">
                <h6>About</h6>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam</p>
            </div>

            <div className="section21 d-flex">
                <div className="crafting">
                    <h1 className="title">
                        Crafting meaningful experiences
                        <span>through thoughtful design and</span>
                        <span>innovative solutions</span>
                    </h1>

                    <p className="subtext">
                        We believe in the power of purposeful creation, where every detail serves a greater vision and every
                        project becomes a testament to our commitment to excellence.
                    </p>

                    <p className="desc">
                        Our journey began with a simple philosophy: to transform ideas into reality through meticulous attention
                        to detail and an unwavering dedication to quality.
                        Today, we continue to push boundaries while staying true to our core values of authenticity, innovation,
                        and meaningful impact.
                    </p>  <hr />

                    <div className="stats d-flex justify-content-between">
                        <div className="stat-box">
                            <h5>8</h5>
                            <p>YEARS OF EXCELLENCE</p>
                        </div>

                        <div className="stat-box">
                            <h5>150</h5>
                            <p>PROJECTS COMPLETED</p>
                        </div>

                        <div className="stat-box">
                            <h5>12</h5>
                            <p>TEAM MEMBERS</p>
                        </div>
                    </div>

                </div>

                <div className="about-img">
                    
                    <div className="image">
                        <img src="/image/about-1.webp" alt="about-1.webp" />
                    </div>

                    <div className="quote-box">
                        <p>"Excellence is never an accident. It is always the result of high intention, sincere effort, and
                            intelligent execution."</p>
                        <span>— Aristotle</span>
                    </div>

                    
                </div>
            </div>

            <div className="discover">
                <a href=""> Discover Our Story <i className="fa-solid fa-arrow-right"></i> </a>
            </div>

            <div className="imagee">
                <img src={client1} alt="" />
                <img src={client2} alt="" />
                <img src={client3} alt="" />
                <img src={client4} alt="" />
                <img src={client5} alt="" />
                <img src={client6} alt="" />
            </div>
        </div>
    )
}

export default About;