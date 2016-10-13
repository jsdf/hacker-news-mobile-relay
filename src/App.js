import React, { Component } from 'react';
import Router from './Router';
import { TopStoriesContainer, TopStoriesRoute } from './TopStories';
import { CommentsContainer, CommentsRoute } from './Comments';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';
import withScroll from 'scroll-behavior';

const history = withScroll(useQueries(createBrowserHistory)());
const routes = {
  TopStories: {
    pattern: '/',
    Component: TopStoriesContainer,
    Route: TopStoriesRoute,
  },
  Comments: {
    pattern: '/story/:id',
    Component: CommentsContainer,
    Route: CommentsRoute,
  },
};

class App extends Component {
  render() {
    return (
      <Router
        history={history}
        routes={routes}
      />
    );
  }
}

export default App;
