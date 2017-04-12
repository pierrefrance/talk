#!/usr/bin/env node

// load previously saved schema data (see "Schema JSON" below)
const raw = require('../graph/typeDefs');

const {graphql, parse} = require('graphql');
const {introspectionQuery, buildASTSchema} = require('graphql/utilities');

const schema = buildASTSchema(parse(raw), 'RootQuery', 'RootMutation');

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(schema, introspectionQuery).then((result) => {
  console.log(JSON.stringify(result.data));
  process.exit();
});
