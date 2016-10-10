var PT = require('react').PropTypes;

module.exports = PT.shape({
  push: PT.func.isRequired,
  replace: PT.func.isRequired,
  go: PT.func.isRequired,
  getState: PT.func.isRequired,
  getRouteUrl: PT.func.isRequired,
});
