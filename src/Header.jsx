import { useState } from 'react';
import Nav from './Nav';
import './header.css';

function Header({ setPage, toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <a href="#main" className={`skiplink ${theme === 'light' ? 'light' : ''}`}>
        Skip to Main Content
      </a>

      <div className="header-logo">
        <img src="/images/ebey.jpg" alt="Ebey Landing" className="logo-image" />
      </div>

      <div className="header-content">
        <div className="menu-container">
         <button
            className="menu-icon"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
          >
            <img src="/images/menu.png" alt="menu" /> Menu
          </button>
          <Nav setPage={setPage} isOpen={menuOpen} onNavigate={closeMenu} />
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </div>
    </header>
  );
}

export default Header;
