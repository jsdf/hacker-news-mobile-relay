var React = require('react')

var styles;
var Badge = props => (
  <span
    style={{
      ...styles.badge,
      ...props.style,
    }}
    children={props.children}
  >
  </span>
),

styles = {
  badge: {
    borderRadius: 100,
    color: '#333',
    display: 'inlineBlock',
    fontSize: 10,
    lineHeight: 1,
    margin: 0,
    paddingBottom: 3,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 2,
  },
}

module.exports = Badge
