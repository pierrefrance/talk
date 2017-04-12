import React from 'react';
import {RootContainer} from 'react-relay';
import Stream from './containers/Stream';
import StreamRoute from './queryRoots/StreamRoute';

function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }

  // If not found, return null.
  return null;
}

export default class Embed extends React.Component {
  render () {
    return (
      <RootContainer
        Component={Stream}
        route={new StreamRoute({assetUrl: getQueryVariable('asset_url')})}
      />
    );
  }
}

