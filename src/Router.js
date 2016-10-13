import React, { Component } from 'react';
import * as Relay from 'react-relay';
import routerContext from './routerContext';
import RoutesRouter from 'routes';
import {disjointMerge} from './utils';

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

    let initialLocation = null;
    this.props.history.listen(location => {
      initialLocation = location;
    })();

    const {
      routeName,
      routeParams,
    } = this.matchCurrentLocation(initialLocation);

    this.state = {
      routeName,
      routeParams,
    };
  }

  static childContextTypes = {
    router: routerContext,
  }

  componentDidMount() {
    this.props.history.listen(location => {
      this.setState(this.matchCurrentLocation(location));
    });
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

  matchCurrentLocation(location) {
    const match = this.router.match(location.pathname);

    if (match) {
      const routeData = match.fn; // I lied, it's not really a function
      return {
        routeName: routeData.name,
        routeParams: disjointMerge(match.params, location.query),
      };
    } else {
      throw new Error(`No route matching ${location.pathname}`);
    }
  }

  navigate(routeName, routeParams, replace = false) {
    const nextState = {
      routeName,
      routeParams,
    };

    const routeUrl = this.getRouteUrl(routeName, routeParams);

    if (replace) {
      this.props.history.replace(
        routeUrl,
        nextState,
      );
    } else {
      this.props.history.push(
        routeUrl,
        nextState,
      );
    }
  }

  push(routeName, routeParams) {
    this.navigate(routeName, routeParams, false);
  }

  replace(routeName, routeParams) {
    this.navigate(routeName, routeParams, true);
  }

  go(n) {
    this.props.history.go(n);
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
        renderLoading={() => <div></div>}
      />
    );
  }
}
