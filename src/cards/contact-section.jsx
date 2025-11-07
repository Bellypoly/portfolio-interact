import React from "react";
import "./contact-section.css";

const ContactSection = () => (
  <div className="contact-grid">
    <div className="contact-card">
      <div className="contact-title">Where to find me</div>
      <div>Mill Creek, WA 98012</div>
      <div>United States</div>
    </div>
    <div className="contact-card">
      <div className="contact-title">Email Me At</div>
      <a className="contact-link" href="mailto:suwaphit.b@gmail.com">
        suwaphit.b@gmail.com
      </a>
    </div>
    <div className="contact-card">
      <div className="contact-title">Call Me At</div>
      <div>Phone: (+1) 806‑283‑2312</div>
    </div>
  </div>
);

export default ContactSection;
