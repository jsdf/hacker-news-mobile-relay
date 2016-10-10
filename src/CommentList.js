var moment = require('moment')
var React = require('react')
var styles;

var Comment = React.createClass({
  getInitialState() {
    return {
      open: true,
    }
  },
  handleDisclosureClick(e) {
    this.setState({open: !this.state.open})
  },
  renderBody(comment) {
    return (
      <div style={styles.commentBody}>
        <div dangerouslySetInnerHTML={{__html:  comment.text}} />
        {
          comment.kids ?
            <CommentList
              commentIds={comment.kids}
              storyComments={this.props.storyComments}
            /> :
            null
        }
      </div>
    )
  },
  render() {
    var {comment} = this.props
    var {open} = this.state

    if (comment == null) return null

    return (
      <div style={styles.comment}>
        <div onClick={this.handleDisclosureClick}>
          <div style={{...styles.disclosureRow, ...styles.inline}}>
            <img
              src={open ? require('./disclosure90.png') : require('./disclosure.png')}
              style={{...styles.disclosure, ...styles.muted}}
            />
            <span style={styles.muted}>
              {' '}
              {moment(comment.time*1000).fromNow()} by {comment.by}
            </span>
          </div>
        </div>
        {open ? this.renderBody(comment) : null}
      </div>
    )
  }
})

var CommentList = React.createClass({
  renderComment(id) {
    return (
      <Comment
        key={id}
        comment={this.props.storyComments[id]}
        storyComments={this.props.storyComments}
      />
    )
  },
  render() {
    return (
      <div>
        {this.props.commentIds.map(this.renderComment)}
      </div>
    )
  }
})

styles = {
  inline: {
    flexDirection: 'row',
  },
  muted: {
    opacity: 0.3,
  },
  textMuted: {
    color: '#BBBBBB',
  },
  comment: {
    fontSize: 14,
    margin: 4,
    padding: 4,
  },
  commentBody: {
    paddingLeft: 10,
    borderLeftColor: '#BBBBBB',
    borderLeftWidth: 1,
  },
  disclosure: {
    verticalAlign: 'middle',
    width: 14,
    height: 14,
    marginLeft: 2,
    marginRight: 8,
  },
  disclosureRow: {
    paddingLeft: 0,
    paddingTop: 4,
    paddingBottom: 4,
  },
};

module.exports = CommentList
