const Viewer = {

  stream(_, {id, url}, {loaders: {Assets}}) {
    let promise;
    if (id) {
      promise = Assets.getByID.load(id);
    } else {
      promise = Assets.getByURL(url);
    }
    return promise.then(asset => ({
      asset,
    }));
  },
};

module.exports = Viewer;
