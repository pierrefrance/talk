import React from 'react';
import {Icon} from 'coral-ui';
import styles from './styles.css';
import {I18n} from 'coral-framework';
import translations from './translations.json';
import {withReaction} from 'coral-plugin-api';
const lang = new I18n(translations);

class LoveButton extends React.Component {
  handleClick = () => {
    const {
      postReaction,
      deleteReaction,
      showSignInDialog,
      alreadyReacted
    } = this.props;
    const {root: {me}} = this.props;

    // If the current user does not exist, trigger sign in dialog.
    if (!me) {
      showSignInDialog();
      return;
    }

    // If the current user is banned, do nothing.
    if (me.status === 'BANNED') {
      return;
    }

    if (alreadyReacted()) {
      deleteReaction();
    } else {
      postReaction();
    }
  };

  render() {
    const {count, alreadyReacted} = this.props;
    return (
      <button
        className={`${styles.button} ${alreadyReacted() ? styles.loved : ''}`}
        onClick={this.handleClick}
      >
        <span>{lang.t(alreadyReacted() ? 'loved' : 'love')}</span>
        <Icon name="favorite" />
        <span>{count > 0 && count}</span>
      </button>
    );
  }
}

export default withReaction('love')(LoveButton);
