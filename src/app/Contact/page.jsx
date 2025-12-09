import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import "./Contact.css"

function page() {
  return (
    <>
    <Header/>
        <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      <p className="contact-description">
        Have questions or need help? We’re here for you!  
        Feel free to reach out through the contact form or using the details below.
      </p>

      {/* Contact Form */}
      <div className="contact-form-box">
        <h2 className="form-title">Send Us a Message</h2>

        <form className="contact-form">
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea placeholder="Write your message..." required></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="contact-info">
        <h2 className="info-title">How to Reach Us</h2>

        <ul className="info-list">
          <li>📧 Email: support@BookOrder.com</li>
          <li>📞 Phone: +91 98765 43210</li>
          <li>📍 Address: Book-Order, Calicut, India</li>
          <li>⏰ Working Hours: Mon–Sat (9:00 AM – 6:00 PM)</li>
        </ul>
      </div>
    </div>

    <Footer/>
    </>
  )
}

export default page