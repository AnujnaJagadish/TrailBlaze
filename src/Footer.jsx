import './footer.css';

function Footer() {
  const handleFormSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <footer className="footer">
      <div className="footer-menu">
        <h2>Contact Us</h2>
        <p>Email: info6150@trailblaze.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>

      <div className="footer-menu">
        <h2>Follow Us</h2>
        <ul className="social-media-list">
          <li>Twitter</li>
          <li>Instagram</li>
          <li>Facebook</li>
        </ul>
      </div>

      <div className="footer-menu">
        <h2>Subscribe to Our Newsletter</h2>
        <form className="newsletter-form" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email Address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
