import React, { Component } from 'react';
import './App.css';
import Router from './Router';
import { TopStoriesContainer, TopStoriesRoute } from './TopStories';
import { CommentsContainer, CommentsRoute } from './Comments';

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
        routes={routes}
      />
    );
  }
}

export default App;
