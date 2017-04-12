import Relay from 'react-relay';
import Stream from '../components/Stream';
import Comment from '../containers/Comment';

export default Relay.createContainer(Stream, {
  initialVariables: {
    first: 10,
    assetUrl: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        stream(url: $assetUrl) {
          asset {
            topComments(first: $first) {
              edges {
                node {
                  id
                  ${Comment.getFragment('comment')}
                }
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      }
    `,
  }
});
