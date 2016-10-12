var React = require('react');
require('./Badge.css');

var Badge = props => (
  <span
    className="Badge_badge"
    style={props.style}
  >
    {props.children}
  </span>
);

module.exports = Badge;
