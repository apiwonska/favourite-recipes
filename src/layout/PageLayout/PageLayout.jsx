import PropTypes from 'prop-types';

import './PageLayout.css';
import Header from '../Header';
import CurvedHeaderEdge from './CurvedHeaderEdge';
import Footer from '../Footer';

const PageLayout = ({ children }) => (
  <>
    <Header />
    <main className="main">
      <CurvedHeaderEdge fill="#f6ab26" />
      <div div className="wrapper">
        {children}
      </div>
    </main>
    <Footer />
  </>
);

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PageLayout.defaultProps = {
  children: <></>,
};

export default PageLayout;
