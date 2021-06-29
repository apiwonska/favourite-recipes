import ScrollToTop from 'react-scroll-up';

import Icon, { iconEnum } from 'assets/Icon';
import './PageLayout.css';
import Header from '../Header';
import CurvedHeaderEdge from './CurvedHeaderEdge';
import CurvedFooterEdge from './CurvedFooterEdge';
import Footer from '../Footer';

interface PageLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <>
    <Header />
    <main className="main">
      <CurvedHeaderEdge fill="#f6ab26" />
      <div className="wrapper">{children}</div>
      <CurvedFooterEdge fill="#f6ab26" />
    </main>
    <Footer />
    <ScrollToTop showUnder={300} aria-hidden>
      <div className="scroll-up-button">
        <Icon name={iconEnum.ArrowUp} />
      </div>
    </ScrollToTop>
  </>
);

export default PageLayout;
