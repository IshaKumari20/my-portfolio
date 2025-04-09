import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./App.css";
import profilePic from "./assets/profile.jpg"; 
import excelCert from "./assets/excel-cert.png";
import clickupCert from "./assets/clickup-cert.png";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [selectedCert, setSelectedCert] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_isha20",
      "template_qa8ip0q",
      e.target,
      "qNJE9jChTwA9d7gS0"
    )
    .then((result) => {
      console.log("Email sent successfully!", result.text);
      alert("Message sent successfully!");
    })
    .catch((error) => {
      console.error("Email sending error:", error.text);
      alert("Failed to send the message.");
    });

    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdHYY_Pp9srQRwQ5mN56qzryA0Uzn2QI_3AG9IMOpcl4b5Vhg/viewform?usp=pp_url";
  
    const formDataGoogle = new FormData();
    formDataGoogle.append("entry.YOUR_NAME_FIELD_ID", formData.name);
    formDataGoogle.append("entry.YOUR_EMAIL_FIELD_ID", formData.email);
    formDataGoogle.append("entry.YOUR_MESSAGE_FIELD_ID", formData.message);

    fetch(googleFormURL, {
      method: "POST",
      body: formDataGoogle,
      mode: "no-cors",
    })
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      })
      .catch((error) => console.error("Error:", error));
  };
  
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <div className="portfolio-container">
      
      {/* Header Section */}
      <header className="header">
        <h1 className="title">Isha Kumari</h1>
        <p>Computer Science Student | Aspiring Software Developer</p>
         {/* Hamburger Menu Icon */}
         <div className="menu-container">
          <div className="menu-icon" onClick={toggleMenu}>≡</div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="dropdown-menu">
              <span onClick={() => scrollToSection("about")}>About</span>
              <span onClick={() => scrollToSection("skills")}>Skills</span>
              <span onClick={() => scrollToSection("achievements")}>Achievements</span>
              <span onClick={() => scrollToSection("projects")}>Projects</span>
              <span onClick={() => scrollToSection("contact")}>Contact</span>
            </div>
          )}
        </div>
      </header>

      {/* Profile Section */}
      <section id="about" className="profile-section">
        <img src={profilePic} alt="Isha Kumari" className="profile-pic" />
        <h2>About</h2>
        <p>
          I am a third-year B.Tech Computer Science student at Banasthali Vidyapith,
          Rajasthan, with a keen interest in software development. Passionate about
          learning new technologies and problem-solving.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <h2>Skills</h2>
        <ul>
          <li>🔹C Programming</li>
          <li>🔹C++ Programming</li>
          <li>🔹DBMS</li>
          <li>🔹Data Structures</li>
          <li>🔹Design & Analysis of Algorithms</li>
          <li>🔹HTML & CSS</li>
          <li>🔹Time Management & Teamwork</li>
        </ul>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements">
        <h2>Achievements</h2>
        <div className="achievement-grid">
          <div className="achievement-card">
            <strong>Wappers</strong>
            <p>Top 40 in "SCRIPT SPRINT" Coding Event</p>
          </div>
          <div className="achievement-card">
            <strong>HackAIthon</strong>
            <p>Participated in a 2-day HackAIthon organized by Azure Developer Community & AIC Banasthali.</p>
          </div>
          <div className="achievement-card">
            <strong>Marathon Runner</strong>
            <p>Completed 5 Km Marathon (Jan 2024)</p>
          </div>
          <div className="achievement-card">
            <strong>HackOn with Amazon</strong>
            <p>HackOn with Amazon - Coding Round Participant</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Data Analysis using Microsoft Excel</h3>
            <p>🔹 Analyzed sales data using sorting, filtering, IF, and VLOOKUP.</p>
            <p>🔹 Built PivotTables to summarize and visualize large datasets.</p>
            <a href="#" className="btn project-link" onClick={() => setSelectedCert(excelCert)}>View Project</a>
          </div>

          <div className="project-card">
            <h3>Project Management with ClickUp</h3>
            <p>🔹 Managed tasks using spaces, folders, and lists while utilizing notes, reminders, and documents for efficient workflow.</p>
            <p>🔹 Improved time management and collaboration skills.</p>
            <a href="#" className="btn project-link" onClick={() => setSelectedCert(clickupCert)}>View Project</a>
          </div>
        </div>
      </section>
      {selectedCert && (
    <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={selectedCert} alt="Project Certificate" className="certificate-image" />
        <button className="close-button" onClick={() => setSelectedCert(null)}>✖</button>
      </div>
    </div>
  )}

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Me</h2>
        <div className="contact-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="btn send-message">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;

