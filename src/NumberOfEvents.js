import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 20,
  }

  handleInputChanged = (event) => {
    let newInput = parseInt(event.target.value);
    if ((newInput > 50) || (newInput < 1)) {
      this.setState({
        numberOfEvents: newInput,
        infoText: 'Please choose a number between 1 and 50',
      });
    } else {
      this.props.updateEvents(undefined, newInput);
      this.setState({
        numberOfEvents: newInput,
        infoText: '',
      });
    }
  }

  render() {
    return (
      <div className="number-of-events">

        <h4>Number of Events Per Page:</h4>
        <input 
          className="inputNumberOfEvents"
          type="number"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />

        <div className="error-alert">
        <ErrorAlert text={this.state.infoText} />
        </div>

      </div>
    )
  }
}

export default NumberOfEvents;