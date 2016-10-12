import React from 'react';
import * as Relay from 'react-relay';
import StoryListItem from './StoryListItem';

const TopStories = (props) => (
  <div>
    {
      props.topstories.stories.map(story =>
        <StoryListItem story={story} key={story.id} />
      )
    }
  </div>
);

export const TopStoriesContainer = Relay.createContainer(TopStories, {
  fragments: {
    topstories: () => Relay.QL`
      fragment on TopStories {
        stories {
          id,
          title,
          position,
          by,
          url,
          score,
          descendants,
          time,
        }
      }
    `,
  },
});

export class TopStoriesRoute extends Relay.Route {
  static routeName = 'TopStories';
  static queries = {
    topstories: (Component) => Relay.QL`
      query TopStoriesQuery {
        topstories {
          ${Component.getFragment('topstories')}
        },
      }
    `,
  };
}
