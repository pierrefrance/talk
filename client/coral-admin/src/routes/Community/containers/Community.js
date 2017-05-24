import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, gql} from 'react-apollo';
import withQuery from 'coral-framework/hocs/withQuery';
import {Spinner} from 'coral-ui';

import {banUser, setUserStatus, rejectUsername} from 'coral-admin/src/graphql/mutations';

import {
  fetchAccounts,
  updateSorting,
  newPage,
  showBanUserDialog,
  hideBanUserDialog,
  showSuspendUserDialog,
  hideSuspendUserDialog
} from '../../../actions/community';

import Community from '../components/Community';

class CommunityContainer extends Component {

  componentWillMount() {
    this.props.fetchAccounts({});
  }

  render() {
    if (this.props.data.error) {
      return <div>{this.props.data.error.message}</div>;
    }

    if (!('users' in this.props.root)) {
      return <div><Spinner/></div>;
    }
    return (
      <Community {...this.props} />
    );
  }
}

export const withCommunityQuery = withQuery(gql`
  query Admin_Community($action_type: ACTION_TYPE) {
    users(query:{action_type: $action_type}){
      id
      username
      status
      roles
      actions{
        id
        created_at
        ... on FlagAction {
          reason
          message
          user {
            id
            username
          }
        }
      }
      action_summaries {
        count
        ... on FlagActionSummary {
          reason
        }
      }
    }
  }
`, {
  options: ({params: {action_type = 'FLAG'}}) => {
    return {
      variables: {
        action_type: action_type
      }
    };
  }
});

const mapStateToProps = (state) => ({
  community: state.community.toJS()
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    fetchAccounts,
    showBanUserDialog,
    hideBanUserDialog,
    showSuspendUserDialog,
    hideSuspendUserDialog,
    updateSorting,
    newPage,
  }, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withCommunityQuery,
  banUser,
  setUserStatus,
  rejectUsername
)(CommunityContainer);