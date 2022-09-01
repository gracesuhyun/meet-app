import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 20,
  }

  handleInputChanged = (event) => {
    let newInput = parseInt(event.target.value);
    if ((newInput > 35) || (newInput < 1)) {
      this.setState({
        numberOfEvents: newInput,
        infoText: 'Please choose a number between 1 and 35',
      })
    } else {
      this.setState({
        numberOfEvents: newInput,
        infoText: '',
      })
    }
        this.props.updateEvents(undefined, newInput);
  }

  render() {
    return (
      <div className="number-of-events">

        <label>Number of Events Per Page:</label>
        <input 
          className="inputNumberOfEvents"
          type="number"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />

        <div className="info-alert">
        <ErrorAlert text={this.state.infoText} />
        </div>

      </div>
    )
  }
}

export default NumberOfEvents;