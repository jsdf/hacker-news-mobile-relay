var moment = require('moment');
var React = require('react');
require('./CommentList.css');

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };
  }

  handleDisclosureClick = (e) => {
    this.setState({open: !this.state.open});
  };

  renderBody(comment) {
    return (
      <div className="CommentList_commentBody">
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
    );
  }

  render() {
    var {comment} = this.props;
    var {open} = this.state;

    if (comment == null) return null;

    return (
      <div className="CommentList_comment">
        <div onClick={this.handleDisclosureClick}>
          <div className="CommentList_disclosureRow CommentList_inline">
            <img
              alt={open ? 'hide' : 'show'}
              src={open ? require('./disclosure90.png') : require('./disclosure.png')}
              className="CommentList_disclosure CommentList_muted"
            />
            <span className="CommentList_muted">
              {' '}
              {moment(comment.time*1000).fromNow()} by {comment.by}
            </span>
          </div>
        </div>
        {open ? this.renderBody(comment) : null}
      </div>
    );
  }
}

class CommentList extends React.Component {
  renderComment = (id) => {
    return (
      <Comment
        key={id}
        comment={this.props.storyComments[id]}
        storyComments={this.props.storyComments}
      />
    );
  };

  render() {
    return (
      <div>
        {this.props.commentIds.map(this.renderComment)}
      </div>
    );
  }
}


module.exports = CommentList;
