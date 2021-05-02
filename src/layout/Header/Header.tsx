import './Header.css';
import LogoSVG from './LogoSVG';

const Header: React.FC = () => (
  <header className="header">
    <h1 className="header-title">Favorite Recipes</h1>
    <div className="header-logo">
      <LogoSVG />
    </div>
  </header>
);

export default Header;
