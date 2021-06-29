import PictureError404 from 'assets/error.svg';
import './PageNotFound404.css';

const PageNotFound404: React.FunctionComponent = () => (
  <div className="text-center">
    <h1 className="mb-5 mt-4">Page Not Found</h1>
    <img
      src={PictureError404}
      alt=""
      aria-hidden
      className="error-picture mt-2"
      data-testid="error-illustration"
    />
  </div>
);

export default PageNotFound404;
