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
  </>
);

export default PageLayout;
