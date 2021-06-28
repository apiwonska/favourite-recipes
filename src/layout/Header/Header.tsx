import { Link } from 'react-router-dom';

import './Header.css';
import AppName1 from 'assets/app-name-part1.png';
import AppName2 from 'assets/app-name-part2.png';

const Header: React.FC = () => (
  <header className="header">
    <Link to="/" className="header-link">
      <img
        src={AppName1}
        alt="Favourite recipes"
        className="header-app-name-img"
        data-testId="app-name"
      />
      <img
        src={AppName2}
        alt=""
        aria-hidden
        className="header-app-name-img"
        data-testId="app-name"
      />
    </Link>
  </header>
);

export default Header;
