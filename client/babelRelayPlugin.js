// `babel-relay-plugin` returns a function for creating plugin instances
const getBabelRelayPlugin = require('babel-relay-plugin');

const path = require('path');
const {execSync} = require('child_process');
const schema = execSync(`node "${path.resolve(__dirname, './introspection.js')}"`, {env: process.env});

// create a plugin instance
module.exports = getBabelRelayPlugin(JSON.parse(schema.toString()));

