import React, { Component } from 'react';
import * as Relay from 'react-relay';
import routerContext from './routerContext';
import RoutesRouter from 'routes';

function createRoutesRouter(routes) {
  const router = new RoutesRouter();
  Object.keys(routes).forEach(routeName => {
    const routeData = routes[routeName];
    routeData.name = routeName;
    routeData.paramNames = [];
    RoutesRouter.pathToRegExp(routeData.pattern, routeData.paramNames);
    router.addRoute(routeData.pattern, routeData);
  });
  return router;
}

export default class RelayRouterComponent extends Component {
  constructor(props) {
    super(props);

    this.router = createRoutesRouter(this.props.routes);

    const {
      routeName,
      routeParams,
    } = this.matchCurrentLocation();

    this.state = {
      routeName,
      routeParams,
    };
  }

  static childContextTypes = {
    router: routerContext,
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState(this.matchCurrentLocation());
    });
  }

  componentDidUpdate() {

  }

  getChildContext() {
    return {
      router: this,
    }
  }

  onReadyStateChange = (readyState) => {
    if (readyState.done) {

    }
  };

  getRouteUrl(routeName, routeParams) {
    const routeData = this.props.routes[routeName];
    let routeUrl = routeData.pattern;
    routeData.paramNames.forEach(paramName => {
      routeUrl = routeUrl.replace(new RegExp(`:${paramName}`), routeParams[paramName]);
    });
    return routeUrl;
  }

  matchCurrentLocation() {
    const match = this.router.match(location.pathname + location.search);

    if (match) {
      const routeData = match.fn; // I lied, it's not really a function
      return {
        routeName: routeData.name,
        routeParams: match.params,
      };
    } else {
      throw new Error(`No route matching ${location.pathname + location.search}`);
    }
  }

  navigate(routeName, routeParams, replace = false) {
    const nextState = {
      routeName,
      routeParams,
    };

    const routeUrl = this.getRouteUrl(routeName, routeParams);

    if (replace) {
      history.replaceState(
        nextState,
        null,
        routeUrl,
      );
    } else {
      history.pushState(
        nextState,
        null,
        routeUrl,
      );
    }
    this.setState(nextState);
  }

  push(routeName, routeParams) {
    this.navigate(routeName, routeParams, false);
  }

  replace(routeName, routeParams) {
    this.navigate(routeName, routeParams, true);
  }

  go(n) {
    history.go(n);
    const nextState = history.state;
    this.setState(nextState);
  }

  getState() {
    return this.state;
  }

  getRouteData(routeName) {
    const routeData = this.props.routes[routeName];
    if (!routeData) throw new Error(`Unknown route ${routeName}`);
    return routeData;
  }

  render() {
    const {
      Component,
      Route,
    } = this.getRouteData(this.state.routeName);

    return (
      <Relay.RootContainer
        Component={Component}
        route={new Route(this.state.routeParams)}
        onReadyStateChange={this.onReadyStateChange}
      />
    );
  }
}
