import React, {Component} from 'react';
import {getSlotElements, debug} from 'coral-framework/helpers/plugins';
import styles from './Slot.css';
import cn from 'classnames';

class Slot extends Component {
  componentWillMount() {
    window.watch('debug', function (value) {
      console.log(value)
    });
  }
  render() {
    const {fill, inline = false, ...rest} = this.props;
    console.log(window.debug)
    return (
      <div className={cn({[styles.inline]: inline, [styles.debug]:window.debug})}>
        {getSlotElements(fill, rest)}
      </div>
    );
  }
}

Slot.propTypes = {
  fill: React.PropTypes.string
};

export default Slot;
