import React from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from 'react-apollo';

import {client} from 'coral-framework/services/client';
import store from 'coral-framework/services/store';

import Embed from './Embed';
import RelayEmbed from './relay/Embed';

import {createNetworkInterface} from 'apollo-client';

/*
render(
  <ApolloProvider client={client} store={store}>
    <Embed />
  </ApolloProvider>
  , document.querySelector('#coralStream')
);*/

import Relay from 'react-relay';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/api/v1/graph/ql')
);

render(
  <RelayEmbed />
  , document.querySelector('#coralStream')
);
