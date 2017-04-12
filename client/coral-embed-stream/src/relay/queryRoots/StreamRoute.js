import Relay from 'react-relay';

export default class StreamRoute extends Relay.Route {
  static queries = {
    viewer: (Component, variables) => Relay.QL`
      query {
        viewer {
          ${Component.getFragment('viewer', variables)},
        }
      }
    `,
  };
  static paramDefinitions = {
    assetUrl: {required: false},
  };
  static routeName = 'StreamRoute';
}
