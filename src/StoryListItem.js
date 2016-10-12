var moment = require('moment');
var React = require('react');

var Link = require('./Link');
var Badge = require('./Badge');
require('./StoryListItem.css');

class StoryListItem extends React.Component {
  renderTitle(story) {
    const content = (
      <div className="StoryListItem_storyTitle">
        {story.position}. <span className="StoryListItem_storyTitleText">{story.title}</span>
      </div>
    );

    return (
      <div>
        {
          story.url ?
            <a href={story.url} className="StoryListItem_link">{content}</a> :
            <Link to="Comments" params={{id: story.id}} className="StoryListItem_link">
              {content}
            </Link>
        }
      </div>
    );
  }

  renderByline(story) {
    const heat = Math.min(Math.log10(story.score) * 0.4, 1);

    return (
      <div className="StoryListItem_row StoryListItem_byline">
        <Badge
          style={{
            backgroundColor: `rgba(255, 102, 0, ${Math.max(heat * 0.5, 0.1)})`,
            color: heat > 1 ? 'white' : 'black' ,
          }}
        >
          <span className="StoryListItem_number">{story.score}</span> points
        </Badge>
        <span>
          <span className="StoryListItem_storyTime">
            {' '}
            submitted {moment(story.time*1000).fromNow()} by {story.by}
          </span>
        </span>
      </div>
    );
  }

  renderArticleButton() {
    var {story} = this.props

    return (
      <div className="StoryListItem_textContainer">
        <div className="StoryListItem_storyCell">
          {this.renderTitle(story)}
          {this.renderByline(story)}
        </div>
      </div>
    )
  }

  renderCommentsButton() {
    var {story} = this.props

    return (
      <div className="StoryListItem_commentsCell">
        <Link to="Comments" params={{id: story.id}} className="StoryListItem_link">
          <div>
            <img
              alt="comments"
              className="StoryListItem_icon"
              src={require('./comment.png')}
            />
          </div>
          <div>
            <span className="StoryListItem_commentsText">
              <span className="StoryListItem_number">{story.descendants}</span> comments
            </span>
          </div>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="StoryListItem_flexContainer StoryListItem_white">
        <div className={
          'StoryListItem_flexContainer StoryListItem_flexFill ' +
          'StoryListItem_cellBorder StoryListItem_row StoryListItem_itemRow'
        }>
          {this.renderArticleButton()}
          {this.renderCommentsButton()}
        </div>
      </div>
    );
  }
}

module.exports = StoryListItem;
