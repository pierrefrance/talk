const Asset = {

  topComments({id}, {first, after}, {loaders: {CommentsRelay}}) {
    const query = {
      asset_id: id,
      paginate: true,
      first,
      after,
    };
    return CommentsRelay.getByQuery(query);
  },
};

module.exports = Asset;
