import React from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from 'react-apollo';

import {client} from 'coral-framework/services/client';

// import store from 'coral-framework/services/store';

import Embed from './Embed';

render(
  <ApolloProvider client={client}>
    <Embed assetID='c417945e-5284-4b34-8942-5903f6ebfb61' />
  </ApolloProvider>
  , document.querySelector('#coralStream')
);
