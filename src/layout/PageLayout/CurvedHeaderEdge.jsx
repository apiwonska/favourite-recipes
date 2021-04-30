import PropTypes from 'prop-types';

const CurvedEdge = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 100"
    style={{ display: 'block' }}
    alt=""
  >
    <path
      fill={fill}
      fillOpacity="1"
      d="M0 43.667L48 38.8C96 34.1149 192 24.1078 288 36.3892C384 48.6705 480 82.3305 576 94.6119C672 106.893 768 96.8862 864 77.6454C960 58.2227 1056 29.1114 1152 19.4227C1248 9.55216 1344 19.5592 1392 24.2443L1440 29.1114V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V43.667Z"
    />
  </svg>
);

CurvedEdge.propTypes = {
  fill: PropTypes.string.isRequired,
};
export default CurvedEdge;
