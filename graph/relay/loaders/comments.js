const {
  singleJoinBy,
} = require('../../loaders/util');
const DataLoader = require('dataloader');

const CommentModel = require('../../../models/comment');

/**
 * genComments returns the comments by the id's. Only admins can see non-public comments.
 * @param  {Object}        context graph context
 * @param  {Array<String>} ids     the comment id's to fetch
 * @return {Promise}       resolves to the comments
 */
const genComments = ({user}, ids) => {
  let comments;
  if (user && user.hasRoles('ADMIN')) {
    comments = CommentModel.find({
      id: {
        $in: ids
      }
    });
  } else {
    comments = CommentModel.find({
      id: {
        $in: ids
      },
      status: {
        $in: ['NONE', 'ACCEPTED']
      }
    });
  }
  return comments.then(singleJoinBy(ids, 'id'));
};

/**
 * Retrieves comments based on the passed in query that is filtered by the
 * current used passed in via the context.
 * @param  {Object} context   graph context
 * @param  {Object} query     query terms to apply to the comments query
 */
const getCommentsByQuery = ({user}, {ids, statuses, asset_id, parent_id, author_id, sort, paginate, first, after}) => {
  let comments = CommentModel.find();

  // Only administrators can search for comments with statuses that are not
  // `null`, or `'ACCEPTED'`.
  if (user != null && user.hasRoles('ADMIN') && statuses) {
    comments = comments.where({
      status: {
        $in: statuses
      }
    });
  } else {
    comments = comments.where({
      status: {
        $in: ['NONE', 'ACCEPTED']
      }
    });
  }

  if (ids) {
    comments = comments.find({
      id: {
        $in: ids
      }
    });
  }

  // Only let an admin request any user or the current user request themself.
  if (user && (user.hasRoles('ADMIN') || user.id === author_id) && author_id != null) {
    comments = comments.where({author_id});
  }

  if (asset_id) {
    comments = comments.where({asset_id});
  }

  // We perform the undefined check because, null, is a valid state for the
  // search to be with, which indicates that it is at depth 0.
  if (parent_id !== undefined) {
    comments = comments.where({parent_id});
  }

  if (after) {
    if (sort === 'REVERSE_CHRONOLOGICAL') {
      comments = comments.where({
        created_at: {
          $lt: after
        }
      });
    } else {
      comments = comments.where({
        created_at: {
          $gt: after
        }
      });
    }
  }

  const cursor = comments
    .sort({created_at: sort === 'REVERSE_CHRONOLOGICAL' ? -1 : 1});

  if (!paginate) {
    return cursor.limit(first);
  } else {
    return cursor
    .limit(first + 1)
    .then(data => {
      const result = {
        edges: data.slice(0, first).map(node => ({
          node,
          cursor: node.created_at,
        })),
        pageInfo: {
          hasNextPage: data.length > first,
          hasPreviousPage: false,
        }
      };
      return result;
    });
  }
};

/**
 * Creates a set of loaders based on a GraphQL context.
 * @param  {Object} context the context of the GraphQL request
 * @return {Object}         object of loaders
 */
module.exports = (context) => ({
  CommentsRelay: {
    getById: new DataLoader((ids) => genComments(context, ids)),
    getByQuery: (query) => getCommentsByQuery(context, query),
  }
});
