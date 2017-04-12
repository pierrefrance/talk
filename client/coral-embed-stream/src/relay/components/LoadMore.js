import React, {PropTypes} from 'react';
import I18n from 'coral-framework/modules/i18n/i18n';
import translations from 'coral-framework/translations.json';
import {Button} from 'coral-ui';
const lang = new I18n(translations);

class LoadMore extends React.Component {
  render () {
    const {loadMore} = this.props;
    return (
      <div className='coral-load-more'>
        <Button onClick={loadMore}>
          {lang.t('viewMoreComments')}
        </Button>
      </div>
    );
  }
}

LoadMore.propTypes = {
  loadMore: PropTypes.func.isRequired
};

export default LoadMore;
