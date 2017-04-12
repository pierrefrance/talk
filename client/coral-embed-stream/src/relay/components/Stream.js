import React from 'react';
import Comment from '../containers/Comment';
import LoadMore from '../components/LoadMore';
import {ADDTL_COMMENTS_ON_LOAD_MORE} from 'coral-framework/constants/comments';

export default class extends React.Component {

  loadMore = () => {
    this.props.relay.setVariables({
      first: this.props.relay.variables.first + ADDTL_COMMENTS_ON_LOAD_MORE,
    });
  }

  render() {
    const topComments = this.props.viewer.stream.asset.topComments;
    const comments = topComments.edges.map(({node}) =>
      <Comment key={node.id} comment={node} depth={0} />
    );
    return (
      <div id='stream'>
        {comments}
        {topComments.pageInfo.hasNextPage
            ? <LoadMore loadMore={this.loadMore} />
            : null
        }
      </div>
    );
  }
}

