var moment = require('moment')
var React = require('react')

var Link = require('./Link')
var Badge = require('./Badge')

var commentImgSrc = require('./comment.png')

var styles;
var StoryListItem = React.createClass({
  renderTitle(story) {
    const content = (
      <div style={styles.storyTitle}>
        {story.position}. <span style={styles.storyTitleText}>{story.title}</span>
      </div>
    );

    return (
      <div>
        {
          story.url ?
            <a href={story.url} style={styles.link}>{content}</a> :
            <Link to="Comments" params={{id: story.id}} style={styles.link}>
              {content}
            </Link>
        }
      </div>
    )
  },
  renderByline(story) {
    const heat = Math.min(Math.log10(story.score) * 0.4, 1);

    return (
      <div style={{...styles.row, ...styles.byline}}>
        <Badge
          style={{
            backgroundColor: `rgba(255, 102, 0, ${Math.max(heat * 0.5, 0.1)})`,
            color: heat > 1 ? 'white' : 'black' ,
          }}
        >
          <span style={styles.number}>{story.score}</span> points
        </Badge>
        <span>
          <span style={styles.storyTime}>
            {' '}
            submitted {moment(story.time*1000).fromNow()} by {story.by}
          </span>
        </span>
      </div>
    )
  },
  renderArticleButton() {
    var {story} = this.props

    return (
      <div style={styles.textContainer}>
        <div style={styles.storyCell}>
          {this.renderTitle(story)}
          {this.renderByline(story)}
        </div>
      </div>
    )
  },
  renderCommentsButton() {
    var {story} = this.props

    return (
      <div style={styles.commentsCell}>
        <Link to="Comments" params={{id: story.id}} style={styles.link}>
          <div>
            <img
              style={styles.icon}
              src={commentImgSrc}
            />
          </div>
          <div>
            <span style={styles.commentsText}>
              <span style={styles.number}>{story.descendants}</span> comments
            </span>
          </div>
        </Link>
      </div>
    )
  },
  render() {
    return (
      <div style={{...styles.flexContainer, ...styles.white}}>
        <div style={{
            ...styles.flexContainer,
            ...styles.flexFill,
            ...styles.cellBorder,
            ...styles.row,
            ...styles.itemRow,
          }}>
          {this.renderArticleButton()}
          {this.renderCommentsButton()}
        </div>
      </div>
    )
  }
})

var cellPadding = 8

styles = {
  flexContainer: {
    display: 'flex',
  },
  flexFill: {
    flex: 1,
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  },
  white: {
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    width: 32,
    height: 32,
  },
  storyCell: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: cellPadding,
  },
  storyTitle: {
    fontSize: 18,
    marginBottom: 2,
    overflow: 'hidden',
  },
  storyTitleText: {
    fontWeight: '700',
  },
  storyTime: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemRow: {
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  byline: {
    padding: 0,
  },
  commentsCell: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: cellPadding,
    textAlign: 'center',
    width: 80,
  },
  number: {
    fontWeight: '700',
  },
  commentsText: {
    fontSize: 10,
    textAlign: 'center',
  },
  cellBorder: {
    borderBottom: 'solid 1px #eee',
    marginBottom: 4,
  },
}

module.exports = StoryListItem
