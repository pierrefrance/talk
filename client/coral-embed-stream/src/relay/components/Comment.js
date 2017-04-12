import React from 'react';

import styles from './Comment.css';
import Content from 'coral-plugin-commentcontent/CommentContent';

export default class extends React.Component {
  render () {
    const {comment, parentId, depth} = this.props;

    console.log(this.props.relay);
    let commentClass = parentId ? `reply ${styles.Reply}` : `comment ${styles.Comment}`;
    commentClass += comment.id === 'pending' ? ` ${styles.pendingComment}` : '';

    return (
      <div
        className={commentClass}
        id={`c_${comment.id}`}
        style={{marginLeft: depth * 30}}>
        <Content body={comment.body} />
        <hr aria-hidden={true} />
      </div>
    );
  }
}

