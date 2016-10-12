import React from 'react';
import * as Relay from 'react-relay';
import CommentList from './CommentList';
import {objectify} from './utils';

const Comments = (props) => (
  <CommentList
    commentIds={props.story.kids}
    storyComments={objectify(props.story.descendantItems)}
  />
);

export const CommentsContainer = Relay.createContainer(Comments, {
  fragments: {
    story: () => Relay.QL`
      fragment on Story {
        title,
        score,
        url,
        by,
        time,
        kids,
        descendantItems {
          id,
          by,
          time,
          text,
        }
      }
    `,
  },
});

export class CommentsRoute extends Relay.Route {
  static routeName = 'Comments';
  static paramDefinitions = {
    id: {required: true},
  };
  static queries = {
    story: (Component) => Relay.QL`
      query StoryCommentsQuery {
        story(id: $id) {
          ${Component.getFragment('story')}
        },
      }
    `,
  };
}
