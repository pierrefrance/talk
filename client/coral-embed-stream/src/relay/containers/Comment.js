import Relay from 'react-relay';
import Comment from '../components/Comment';

export default Relay.createContainer(Comment, {
  fragments: {
    comment: () => Relay.QL`
      fragment on CommentRelay {
        id
        body
        createdAt
      }
    `,
  }
});
