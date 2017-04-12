const {fromGlobalId} = require('graphql-relay');

const RootQuery = {
  node(_, input, {loaders}) {
    const {type, id} = fromGlobalId(input.id);
    switch(type) {
    case 'CommentRelay':
      return loaders.Comments.get.load(id);
    default:
      return null;
    }
  },
  viewer() {
    return {};
  },
};

module.exports = RootQuery;
