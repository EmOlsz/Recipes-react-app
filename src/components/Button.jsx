// @flow
import React from "react";

import { availableIntents } from './utils/availableIntents';

type Props = {
  text: string,
  intent: string,
  type?: string,
  onClick?: () => void,
}

class Button extends React.PureComponent<Props> {
  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
  
  render() {
    const { text, intent, type } = this.props;
    const isIntentCorrect = availableIntents.find(el => intent === el);
  
    if (intent && !isIntentCorrect) {
      console.error('Enter one of available intents');
      return null;
    }
    return (
      <button
        className={`button button__${intent || 'none'}`}
        onClick={this.onClick}
        type={type || 'button'}
      >
        {text || ''}
      </button>
    );
  }
}

export default Button;