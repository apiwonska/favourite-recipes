import Icon, { iconEnum } from 'assets/Icon';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="footer">
    <div>
      <a href="https://github.com/apiwonska/favourite-recipes">
        <Icon name={iconEnum.Github} size="30" />
        &nbsp;Github
      </a>
    </div>
  </footer>
);

export default Footer;
