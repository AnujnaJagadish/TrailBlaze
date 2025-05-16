import './nav.css';
import menu from './menu';

function Nav({ setPage, isOpen, onNavigate }) {
  return (
    <nav className={`nav ${isOpen ? 'open' : ''}`} aria-label="Main Navigation">
      <ul className="nav-list">
        {menu.map((item) => (
          <li key={item.name} className="nav-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(item.path);
                onNavigate(); 
              }}
              className="nav-link"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;