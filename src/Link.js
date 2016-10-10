var React = require('react')
var routerContext = require('./routerContext');

var Link = React.createClass({
  contextTypes: {
    router: routerContext,
  },

  onClick(e) {
    e.preventDefault();
    this.context.router.push(
      this.props.to,
      this.props.params,
    );
  },

  render() {
    const uriPath = this.context.router.getRouteUrl(
      this.props.to,
      this.props.params,
    );

    return (
      <a
        href={uriPath}
        style={this.props.style}
        children={this.props.children}
        onClick={this.onClick}
      />
    );
  }
});

module.exports = Link;
